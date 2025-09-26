-- Fix RLS policies for transactions to allow proper creation and viewing
-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Users can create transactions as buyer" ON public.transactions;
DROP POLICY IF EXISTS "Users can update their own transactions as buyer" ON public.transactions;
DROP POLICY IF EXISTS "Users can update their own transactions as seller" ON public.transactions;
DROP POLICY IF EXISTS "Users can view their own transactions as buyer" ON public.transactions;
DROP POLICY IF EXISTS "Users can view their own transactions as seller" ON public.transactions;

-- Create more permissive RLS policies for transactions
CREATE POLICY "Users can create transactions as buyer" 
ON public.transactions 
FOR INSERT 
WITH CHECK (auth.uid() = buyer_id);

CREATE POLICY "Users can create transactions as seller" 
ON public.transactions 
FOR INSERT 
WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Users can view transactions they are part of" 
ON public.transactions 
FOR SELECT 
USING (auth.uid() = buyer_id OR auth.uid() = seller_id);

CREATE POLICY "Buyers can update their transactions" 
ON public.transactions 
FOR UPDATE 
USING (auth.uid() = buyer_id);

CREATE POLICY "Sellers can update their transactions" 
ON public.transactions 
FOR UPDATE 
USING (auth.uid() = seller_id);

-- Also ensure profiles have proper phone number handling
-- Make phone numbers consistent and not null where possible
UPDATE profiles SET phone = TRIM(phone) WHERE phone IS NOT NULL AND TRIM(phone) != '';

-- Create index on phone for faster searches
CREATE INDEX IF NOT EXISTS idx_profiles_phone ON profiles(phone) WHERE phone IS NOT NULL;