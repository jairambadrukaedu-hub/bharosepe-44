-- Add comprehensive profile fields for buyer/seller details in contracts
-- This migration ensures all profile data is stored for contract generation

ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS full_name TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS city TEXT,
ADD COLUMN IF NOT EXISTS state TEXT,
ADD COLUMN IF NOT EXISTS pincode TEXT,
ADD COLUMN IF NOT EXISTS pan_number TEXT,
ADD COLUMN IF NOT EXISTS gst_number TEXT,
ADD COLUMN IF NOT EXISTS business_name TEXT,
ADD COLUMN IF NOT EXISTS business_type TEXT CHECK (business_type IN ('individual', 'business', 'llc', 'pvt_ltd')),
ADD COLUMN IF NOT EXISTS verified_phone BOOLEAN DEFAULT FALSE;

-- Create index for faster profile lookups
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_phone ON profiles(phone);

-- Add RLS policy to allow users to view other profiles for transactions
CREATE POLICY "Users can view profiles for transactions" ON profiles
FOR SELECT USING (
  auth.uid() = id OR
  (SELECT COUNT(*) FROM transactions t 
   WHERE (t.buyer_id = auth.uid() AND t.seller_id = profiles.id) OR
         (t.seller_id = auth.uid() AND t.buyer_id = profiles.id)) > 0
)
WITH CHECK (true);
