-- Phase 1: Fix Critical RLS Policy Vulnerabilities (without recreating existing types)

-- 1. Create user roles table (skip if app_role type already exists)
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('admin', 'moderator', 'support', 'user')),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles safely
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
      AND role = _role
  )
$$;

-- 2. Fix profiles RLS policies - Remove overly permissive policy
DROP POLICY IF EXISTS "Authenticated users can search profiles for transactions" ON public.profiles;

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

-- Only allow service role to create notifications
CREATE POLICY "Only system can create notifications"
ON public.notifications
FOR INSERT
WITH CHECK (
  -- Only allow if called from edge function with service role
  auth.role() = 'service_role'
);

-- 4. Fix support access policies with proper role verification
-- Update disputes policy
DROP POLICY IF EXISTS "Support can update any dispute" ON public.disputes;

CREATE POLICY "Verified support staff can update disputes"
ON public.disputes
FOR UPDATE
USING (
  public.has_role(auth.uid(), 'support') OR 
  public.has_role(auth.uid(), 'admin')
);

-- Update escalations policy
DROP POLICY IF EXISTS "Support staff can view and manage all escalations" ON public.escalations;

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
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all roles"
ON public.user_roles
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- 6. Create trigger for user_roles updated_at (if table was created)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_roles' AND table_schema = 'public') THEN
        DROP TRIGGER IF EXISTS update_user_roles_updated_at ON public.user_roles;
        CREATE TRIGGER update_user_roles_updated_at
        BEFORE UPDATE ON public.user_roles
        FOR EACH ROW
        EXECUTE FUNCTION public.update_updated_at_column();
    END IF;
END $$;