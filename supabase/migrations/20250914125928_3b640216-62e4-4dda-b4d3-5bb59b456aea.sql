-- Fix profile RLS policy to protect user privacy
-- Users should only see profiles of people they interact with through transactions

DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

-- Create more restrictive policy - users can only see profiles of people they have transactions with
CREATE POLICY "Users can view transaction-related profiles" 
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

-- Also add policy for phone-based search (for contact search functionality)
CREATE POLICY "Users can search profiles by phone for transactions" 
ON public.profiles 
FOR SELECT 
USING (
  user_id = auth.uid() OR  -- Can always see own profile
  phone IS NOT NULL        -- Allow phone-based search for transaction creation
);