-- Allow sellers to create transactions as seller as well
-- This complements the existing buyer insert policy
CREATE POLICY IF NOT EXISTS "Users can create transactions as seller"
ON public.transactions
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = seller_id);
