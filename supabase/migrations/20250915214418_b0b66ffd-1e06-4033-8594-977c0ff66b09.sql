-- Remove the security definer view and replace with a more secure approach
DROP VIEW IF EXISTS public.contracts_with_roles;

-- Create RLS policies for the contracts table that handle role-based access
-- Grant access to view contracts based on roles in transactions
CREATE POLICY "Users can view contracts by transaction role" ON public.contracts
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM transactions t 
    WHERE t.id = contracts.transaction_id 
    AND (t.buyer_id = auth.uid() OR t.seller_id = auth.uid())
  )
);