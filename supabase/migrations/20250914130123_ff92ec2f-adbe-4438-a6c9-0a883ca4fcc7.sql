-- Fix profile RLS policies to protect user privacy
-- First drop existing policies
DROP POLICY IF EXISTS "Users can view transaction-related profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can search profiles by phone for transactions" ON public.profiles;

-- Create more restrictive policy - users can only see their own profile and profiles they interact with
CREATE POLICY "Users can view own and transaction-related profiles" 
ON public.profiles 
FOR SELECT 
USING (
  user_id = auth.uid() OR  -- Can always see own profile
  EXISTS (
    SELECT 1 FROM public.transactions t 
    WHERE (t.buyer_id = auth.uid() AND t.seller_id = profiles.user_id) 
       OR (t.seller_id = auth.uid() AND t.buyer_id = profiles.user_id)
  )
);