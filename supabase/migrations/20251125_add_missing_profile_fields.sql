-- Add comprehensive profile fields for buyer/seller details in contracts
-- Migration for existing profiles table structure
-- Note: Some columns (full_name, phone) already exist, so we only add the missing ones
-- Note: Role is NOT stored - users switch between buyer/seller dynamically

ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS email TEXT,
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS city TEXT,
ADD COLUMN IF NOT EXISTS state TEXT,
ADD COLUMN IF NOT EXISTS pincode TEXT,
ADD COLUMN IF NOT EXISTS pan_number TEXT,
ADD COLUMN IF NOT EXISTS gst_number TEXT,
ADD COLUMN IF NOT EXISTS business_name TEXT,
ADD COLUMN IF NOT EXISTS business_type TEXT CHECK (business_type IN ('individual', 'business', 'llc', 'pvt_ltd')),
ADD COLUMN IF NOT EXISTS verified_phone BOOLEAN DEFAULT FALSE;

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_phone ON profiles(phone);
