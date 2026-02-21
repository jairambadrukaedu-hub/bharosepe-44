-- Check what's actually in the profiles table for the user
SELECT 
  id,
  user_id,
  full_name,
  email,
  phone,
  address,
  city,
  state,
  pincode,
  pan_number,
  gst_number,
  verified_phone,
  business_name,
  business_type,
  created_at,
  updated_at
FROM profiles
WHERE id = '014fd221-460c-4be1-913e-982e4846da83' OR user_id = '014fd221-460c-4be1-913e-982e4846da83'
ORDER BY created_at DESC
LIMIT 5;

-- Also check for any other profiles
SELECT 
  id,
  full_name,
  email,
  phone,
  address,
  city,
  state,
  pincode,
  pan_number,
  gst_number
FROM profiles
LIMIT 10;
