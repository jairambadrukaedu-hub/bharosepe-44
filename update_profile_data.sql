-- UPDATE the test user's profile with sample data
-- Replace the UUID with the actual user ID from your database

UPDATE profiles
SET 
  address = '123 Main Street, Apartment 4B',
  city = 'Hyderabad',
  state = 'Telangana',
  pincode = '500081',
  pan_number = 'AAUPA5055K',
  gst_number = '36AABPA5055K1Z0',
  verified_phone = true,
  business_name = 'Vorey Enterprises',
  updated_at = NOW()
WHERE id = '014fd221-460c-4be1-913e-982e4846da83' 
   OR user_id = '014fd221-460c-4be1-913e-982e4846da83';

-- Verify the update
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
  gst_number
FROM profiles
WHERE id = '014fd221-460c-4be1-913e-982e4846da83' 
   OR user_id = '014fd221-460c-4be1-913e-982e4846da83';
