-- Fix only the remaining critical security vulnerabilities

-- 1. Remove the overly permissive profiles policy (if it still exists)
DROP POLICY IF EXISTS "Authenticated users can search profiles for transactions" ON public.profiles;

-- 2. Fix notifications RLS policies - Prevent fake notifications
DROP POLICY IF EXISTS "System can create notifications" ON public.notifications;

-- Only allow service role to create notifications
CREATE POLICY "Only system can create notifications"
ON public.notifications
FOR INSERT
WITH CHECK (
  -- Only allow if called from edge function with service role
  auth.role() = 'service_role'
);

-- 3. Fix support access policies - ensure proper role verification exists
-- Check if has_role function exists with correct signature
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
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
      AND role = _role
  )
$$;

-- Update disputes policy for proper role verification
DROP POLICY IF EXISTS "Support can update any dispute" ON public.disputes;
DROP POLICY IF EXISTS "Verified support staff can update disputes" ON public.disputes;

CREATE POLICY "Verified support staff can update disputes"
ON public.disputes
FOR UPDATE
USING (
  public.has_role(auth.uid(), 'support'::app_role) OR 
  public.has_role(auth.uid(), 'admin'::app_role)
);

-- Update escalations policy for proper role verification
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
  public.has_role(auth.uid(), 'support'::app_role) OR 
  public.has_role(auth.uid(), 'admin'::app_role)
);