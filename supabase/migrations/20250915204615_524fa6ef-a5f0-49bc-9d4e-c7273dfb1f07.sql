-- Check and fix RLS policies for transactions
-- First drop ALL existing policies to start fresh
DROP POLICY IF EXISTS "Users can create transactions as buyer" ON public.transactions;
DROP POLICY IF EXISTS "Users can create transactions as seller" ON public.transactions;
DROP POLICY IF EXISTS "Users can update their own transactions as buyer" ON public.transactions;
DROP POLICY IF EXISTS "Users can update their own transactions as seller" ON public.transactions;
DROP POLICY IF EXISTS "Users can view their own transactions as buyer" ON public.transactions;
DROP POLICY IF EXISTS "Users can view their own transactions as seller" ON public.transactions;
DROP POLICY IF EXISTS "Users can view transactions they are part of" ON public.transactions;
DROP POLICY IF EXISTS "Buyers can update their transactions" ON public.transactions;
DROP POLICY IF EXISTS "Sellers can update their transactions" ON public.transactions;

-- Create comprehensive RLS policies for transactions
CREATE POLICY "Users can create transactions as buyer" 
ON public.transactions 
FOR INSERT 
WITH CHECK (auth.uid() = buyer_id);

CREATE POLICY "Users can view transactions they are part of" 
ON public.transactions 
FOR SELECT 
USING (auth.uid() = buyer_id OR auth.uid() = seller_id);

CREATE POLICY "Transaction participants can update status" 
ON public.transactions 
FOR UPDATE 
USING (auth.uid() = buyer_id OR auth.uid() = seller_id);

-- Create index on phone for faster searches  
CREATE INDEX IF NOT EXISTS idx_profiles_phone ON profiles(phone) WHERE phone IS NOT NULL;