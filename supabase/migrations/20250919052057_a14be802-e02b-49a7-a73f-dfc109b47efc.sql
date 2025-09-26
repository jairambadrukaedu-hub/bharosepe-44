-- Fix Critical RLS Policy Vulnerabilities (handle existing policies)

-- 1. Fix the has_role function to work with app_role enum
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role TEXT)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role::app_role
  )
$$;

-- 2. Fix profiles RLS policies - Remove overly permissive policy and replace
DROP POLICY IF EXISTS "Authenticated users can search profiles for transactions" ON public.profiles;
DROP POLICY IF EXISTS "Transaction participants can view counterpart profiles" ON public.profiles;

-- Replace with restricted transaction-based access
CREATE POLICY "Transaction participants can view counterpart profiles"
ON public.profiles
FOR SELECT
USING (
  user_id = auth.uid() OR
  EXISTS (
    SELECT 1
    FROM transactions t
    WHERE (
      (t.buyer_id = auth.uid() AND t.seller_id = profiles.user_id) OR
      (t.seller_id = auth.uid() AND t.buyer_id = profiles.user_id)
    )
  )
);

-- 3. Fix notifications RLS policies - Prevent fake notifications
DROP POLICY IF EXISTS "System can create notifications" ON public.notifications;
DROP POLICY IF EXISTS "Only system can create notifications" ON public.notifications;

-- Only allow service role to create notifications
CREATE POLICY "Only system can create notifications"
ON public.notifications
FOR INSERT
WITH CHECK (
  -- Only allow if called from edge function with service role
  auth.role() = 'service_role'
);

-- 4. Fix support access policies with proper role verification
DROP POLICY IF EXISTS "Support can update any dispute" ON public.disputes;
DROP POLICY IF EXISTS "Verified support staff can update disputes" ON public.disputes;

CREATE POLICY "Verified support staff can update disputes"
ON public.disputes
FOR UPDATE
USING (
  public.has_role(auth.uid(), 'support') OR 
  public.has_role(auth.uid(), 'admin')
);

-- Update escalations policy
DROP POLICY IF EXISTS "Support staff can view and manage all escalations" ON public.escalations;
DROP POLICY IF EXISTS "Verified support staff can manage escalations" ON public.escalations;

CREATE POLICY "Verified support staff can manage escalations"
ON public.escalations
FOR ALL
USING (
  -- Transaction participants can view their own escalations
  EXISTS (
    SELECT 1
    FROM transactions t
    WHERE t.id = escalations.transaction_id 
    AND (t.buyer_id = auth.uid() OR t.seller_id = auth.uid())
  ) OR
  -- Verified support staff can manage all escalations
  public.has_role(auth.uid(), 'support') OR 
  public.has_role(auth.uid(), 'admin')
);

-- 5. Add RLS policies for user_roles table
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;

CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all roles"
ON public.user_roles
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));