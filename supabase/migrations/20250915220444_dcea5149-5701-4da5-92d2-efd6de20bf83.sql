-- Allow sellers to create transactions as seller as well
CREATE POLICY "Users can create transactions as seller"
ON public.transactions
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = seller_id);
