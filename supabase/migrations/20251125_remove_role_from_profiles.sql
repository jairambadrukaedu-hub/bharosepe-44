-- Remove role column from profiles table
-- Role is dynamic and determined by transaction context, not stored in profile

-- Drop the role column
ALTER TABLE profiles DROP COLUMN IF EXISTS role CASCADE;
