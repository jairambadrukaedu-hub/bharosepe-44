-- Check if profile table has all required fields
-- Run this in Supabase SQL Editor

-- SIMPLE: See ALL columns in profiles table right now
SELECT 
  ordinal_position,
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'profiles' AND table_schema = 'public'
ORDER BY ordinal_position;

-- VISUAL: See all columns as a simple list
SELECT column_name FROM information_schema.columns
WHERE table_name = 'profiles' AND table_schema = 'public'
ORDER BY ordinal_position;


-- CHECK REQUIRED FIELDS: Compare what we have vs what we need
SELECT 
  'full_name' as field,
  CASE WHEN EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'full_name'
  ) THEN '✅ YES' ELSE '❌ NO' END as exists_in_db
UNION ALL
SELECT 
  'phone' as field,
  CASE WHEN EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'phone'
  ) THEN '✅ YES' ELSE '❌ NO' END
UNION ALL
SELECT 
  'address' as field,
  CASE WHEN EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'address'
  ) THEN '✅ YES' ELSE '❌ NO' END
UNION ALL
SELECT 
  'city' as field,
  CASE WHEN EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'city'
  ) THEN '✅ YES' ELSE '❌ NO' END
UNION ALL
SELECT 
  'state' as field,
  CASE WHEN EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'state'
  ) THEN '✅ YES' ELSE '❌ NO' END
UNION ALL
SELECT 
  'pincode' as field,
  CASE WHEN EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'pincode'
  ) THEN '✅ YES' ELSE '❌ NO' END
UNION ALL
SELECT 
  'pan_number' as field,
  CASE WHEN EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'pan_number'
  ) THEN '✅ YES' ELSE '❌ NO' END
UNION ALL
SELECT 
  'gst_number' as field,
  CASE WHEN EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'gst_number'
  ) THEN '✅ YES' ELSE '❌ NO' END
UNION ALL
SELECT 
  'business_name' as field,
  CASE WHEN EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'business_name'
  ) THEN '✅ YES' ELSE '❌ NO' END
UNION ALL
SELECT 
  'business_type' as field,
  CASE WHEN EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'business_type'
  ) THEN '✅ YES' ELSE '❌ NO' END
UNION ALL
SELECT 
  'verified_phone' as field,
  CASE WHEN EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'verified_phone'
  ) THEN '✅ YES' ELSE '❌ NO' END
ORDER BY field;

-- SUMMARY: Count how many new fields exist
SELECT 
  COUNT(CASE WHEN column_name IN (
    'full_name', 'phone', 'address', 'city', 'state', 'pincode',
    'pan_number', 'gst_number', 'business_name', 'business_type', 'verified_phone'
  ) THEN 1 END) as migrated_fields_found,
  COUNT(*) as total_columns
FROM information_schema.columns
WHERE table_name = 'profiles' AND table_schema = 'public';

-- ACTUAL DATA: See one real profile (if exists)
SELECT * FROM profiles LIMIT 1;

-- COUNT: How many profiles exist
SELECT COUNT(*) as total_profiles FROM profiles;
