-- Add RLS policy to allow authenticated users to search for other users' profiles
-- This enables contact search functionality for initiating new transactions
CREATE POLICY "Authenticated users can search profiles for transactions" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (true);