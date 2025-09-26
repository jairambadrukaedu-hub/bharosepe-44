-- Allow users to search profiles by phone for transaction creation
-- This policy allows authenticated users to view basic profile info (needed for contact search)
CREATE POLICY "Users can search profiles for transactions" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (
  -- Allow viewing basic profile info when phone is provided
  -- This is needed for transaction creation before any transaction exists
  phone IS NOT NULL AND 
  (
    auth.uid() != user_id -- Can search for others, not yourself
  )
);