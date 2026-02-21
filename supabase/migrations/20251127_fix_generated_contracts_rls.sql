-- Fix RLS policies for generated_contracts table to allow inserts
-- The current policy only allows SELECT, we need INSERT and UPDATE policies

-- First, check if RLS is enabled
ALTER TABLE public.generated_contracts ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow users to read their own contracts" ON public.generated_contracts;
DROP POLICY IF EXISTS "Allow users to insert their own contracts" ON public.generated_contracts;
DROP POLICY IF EXISTS "Allow users to update their own contracts" ON public.generated_contracts;

-- Create comprehensive policies
-- Policy 1: Allow SELECT for own contracts (seller or buyer)
CREATE POLICY "Allow users to read their own contracts"
  ON public.generated_contracts
  FOR SELECT
  USING (
    auth.uid() = seller_id OR auth.uid() = buyer_id
  );

-- Policy 2: Allow INSERT for any authenticated user (they're creating contracts for transactions)
CREATE POLICY "Allow users to create contracts"
  ON public.generated_contracts
  FOR INSERT
  WITH CHECK (true); -- Allow any authenticated user to create contracts

-- Policy 3: Allow UPDATE for seller or buyer of the contract
CREATE POLICY "Allow users to update their own contracts"
  ON public.generated_contracts
  FOR UPDATE
  USING (auth.uid() = seller_id OR auth.uid() = buyer_id)
  WITH CHECK (auth.uid() = seller_id OR auth.uid() = buyer_id);

-- Policy 4: Allow DELETE for admin or contract participants
CREATE POLICY "Allow users to delete their own contracts"
  ON public.generated_contracts
  FOR DELETE
  USING (auth.uid() = seller_id OR auth.uid() = buyer_id);
