/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * BHAROSE PE - TEST DATA & SAMPLE OPERATIONS
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * This file contains:
 * 1. Sample form submission data
 * 2. Test operations for draft saving
 * 3. Test operations for template creation
 * 4. Test operations for template reusability
 * 5. Verification queries
 * 
 * Date: November 28, 2025
 */

-- ═══════════════════════════════════════════════════════════════════════════════
-- PART 1: INSERT SAMPLE TEST DATA
-- ═══════════════════════════════════════════════════════════════════════════════

/**
 * TEST CASE 1: DRAFT SAVING
 * Simulate user filling form and saving draft
 */

-- Step 1: User starts filling form for electronics item
INSERT INTO form_submissions (
  user_id,
  seller_id,
  buyer_id,
  transaction_id,
  industry_category,
  product_category,
  annexure_code,
  product_name,
  brand,
  model,
  description,
  condition_category,
  color,
  sale_price,
  storage,
  ram,
  processor,
  battery_health_percent,
  power_on_working,
  charging_working,
  technical_specs,
  condition_data,
  accessories_data,
  is_draft,
  form_status,
  completion_percentage,
  required_fields_completed,
  total_fields_filled,
  created_at,
  updated_at
)
VALUES (
  'user-123-uuid'::uuid,              -- user_id (seller)
  'user-123-uuid'::uuid,              -- seller_id
  NULL,                               -- buyer_id (not filled yet)
  'txn-draft-001',                    -- transaction_id
  'electronics',                      -- industry_category
  'mobile_phones',                    -- product_category
  'A',                                -- annexure_code (Electronics)
  'iPhone 13 Pro',                    -- product_name
  'Apple',                            -- brand
  'A15 Bionic',                       -- model
  'Excellent condition iPhone 13 Pro. Used for 2 months only.',
  'mint_condition',                   -- condition_category
  'Space Gray',                       -- color
  75000,                              -- sale_price (₹75,000)
  128,                                -- storage (128GB)
  6,                                  -- ram (6GB)
  'A15 Bionic',                       -- processor
  95,                                 -- battery_health_percent
  true,                               -- power_on_working
  true,                               -- charging_working
  '{"display_size": 6.1, "screen_type": "OLED", "refresh_rate": 120}'::jsonb,
  '{"damage": "None", "scratches": false, "dents": false}'::jsonb,
  '{"original_box": true, "original_charger": true, "cables": true}'::jsonb,
  true,                               -- is_draft = true
  'draft',                            -- form_status
  60,                                 -- completion_percentage
  8,                                  -- required_fields_completed
  15,                                 -- total_fields_filled
  NOW(),
  NOW()
);

-- ═══════════════════════════════════════════════════════════════════════════════

/**
 * TEST CASE 2: UPDATE DRAFT WITH MORE DATA
 * User resumes draft and adds more details
 */

UPDATE form_submissions
SET
  expected_delivery_date = '2025-12-05',
  warranty_status = 'apple_care_plus',
  warranty_info = 'Apple Care+ coverage until Dec 2026',
  delivery_method = 'courier',
  delivery_address = '123 Market Street, Mumbai, MH 400001',
  warranty_valid_until = '2026-12-05',
  inspection_window_hours = 72,
  return_policy = 'No return, inspection period 72 hours',
  technical_specs = technical_specs || '{"camera": "48MP primary + 12MP ultra-wide", "biometric": "Face ID"}'::jsonb,
  condition_data = condition_data || '{"usage": "Light usage, minimal wear", "original_accessories": true}'::jsonb,
  accessories_data = accessories_data || '{"case": true, "earphones": false, "stand_base": false}'::jsonb,
  completion_percentage = 85,
  required_fields_completed = 10,
  total_fields_filled = 22,
  updated_at = NOW()
WHERE
  transaction_id = 'txn-draft-001'
  AND is_draft = true;

-- ═══════════════════════════════════════════════════════════════════════════════

/**
 * TEST CASE 3: SUBMIT DRAFT (Complete form)
 * User clicks "Submit Form", mark as completed
 */

UPDATE form_submissions
SET
  is_draft = false,
  form_status = 'completed',
  submitted_at = NOW(),
  completion_percentage = 100,
  required_fields_completed = 11,
  total_fields_filled = 28
WHERE
  transaction_id = 'txn-draft-001'
RETURNING id, transaction_id, form_status, completion_percentage;

-- ═══════════════════════════════════════════════════════════════════════════════

/**
 * TEST CASE 4: MARK COMPLETED FORM AS REUSABLE TEMPLATE
 * User clicks "Save as Template" to reuse this form later
 */

UPDATE form_submissions
SET
  is_template = true,
  template_name = 'My iPhone 13 Pro Listing (Standard)',
  template_category = 'electronics',
  updated_at = NOW()
WHERE
  transaction_id = 'txn-draft-001'
  AND form_status = 'completed'
RETURNING id, template_name, is_template;

-- ═══════════════════════════════════════════════════════════════════════════════

/**
 * TEST CASE 5: FETCH USER'S SAVED TEMPLATES
 * Show user: "Your saved templates"
 */

SELECT
  id,
  template_name,
  product_name,
  brand,
  sale_price,
  condition_category,
  created_at,
  last_used_at
FROM form_submissions
WHERE
  user_id = 'user-123-uuid'::uuid
  AND is_template = true
  AND industry_category = 'electronics'
ORDER BY last_used_at DESC NULLS LAST;

-- ═══════════════════════════════════════════════════════════════════════════════

/**
 * TEST CASE 6: CREATE NEW FORM FROM TEMPLATE
 * User clicks "Use This Template" for new transaction
 */

INSERT INTO form_submissions (
  user_id,
  seller_id,
  buyer_id,
  transaction_id,
  industry_category,
  product_category,
  annexure_code,
  product_name,
  brand,
  model,
  description,
  condition_category,
  color,
  sale_price,
  storage,
  ram,
  processor,
  battery_health_percent,
  power_on_working,
  charging_working,
  expected_delivery_date,
  warranty_status,
  warranty_info,
  delivery_method,
  delivery_address,
  warranty_valid_until,
  inspection_window_hours,
  return_policy,
  technical_specs,
  condition_data,
  accessories_data,
  is_draft,
  is_template,
  form_status,
  completion_percentage,
  required_fields_completed,
  total_fields_filled,
  created_at,
  updated_at
)
SELECT
  'user-123-uuid'::uuid,  -- Same seller
  'user-123-uuid'::uuid,  -- Same seller_id
  NULL,                   -- New buyer_id (to be filled)
  'txn-new-from-template-001',  -- New transaction_id
  industry_category,
  product_category,
  annexure_code,
  product_name,
  brand,
  model,
  description,
  condition_category,
  color,
  sale_price,
  storage,
  ram,
  processor,
  battery_health_percent,
  power_on_working,
  charging_working,
  expected_delivery_date,
  warranty_status,
  warranty_info,
  delivery_method,
  delivery_address,
  warranty_valid_until,
  inspection_window_hours,
  return_policy,
  technical_specs,
  condition_data,
  accessories_data,
  true,     -- is_draft = true (new form is draft)
  false,    -- is_template = false
  'draft',  -- form_status
  100,      -- completion_percentage (pre-filled from template)
  11,       -- required_fields_completed
  28,       -- total_fields_filled
  NOW(),    -- created_at
  NOW()     -- updated_at
FROM form_submissions
WHERE
  transaction_id = 'txn-draft-001'
  AND is_template = true;

-- Update template's last_used_at
UPDATE form_submissions
SET last_used_at = NOW()
WHERE transaction_id = 'txn-draft-001' AND is_template = true;

-- ═══════════════════════════════════════════════════════════════════════════════
-- PART 2: VERIFICATION QUERIES
-- ═══════════════════════════════════════════════════════════════════════════════

/**
 * VERIFICATION 1: Check all forms for this user
 */

SELECT
  id,
  transaction_id,
  product_name,
  brand,
  sale_price,
  is_draft,
  is_template,
  form_status,
  completion_percentage,
  created_at,
  updated_at
FROM form_submissions
WHERE user_id = 'user-123-uuid'::uuid
ORDER BY created_at DESC;

-- ═══════════════════════════════════════════════════════════════════════════════

/**
 * VERIFICATION 2: Check draft count for user
 */

SELECT
  COUNT(*) FILTER (WHERE is_draft = true) as active_drafts,
  COUNT(*) FILTER (WHERE is_template = true) as saved_templates,
  COUNT(*) FILTER (WHERE form_status = 'completed') as completed_forms,
  COUNT(*) as total_forms
FROM form_submissions
WHERE user_id = 'user-123-uuid'::uuid;

-- ═══════════════════════════════════════════════════════════════════════════════

/**
 * VERIFICATION 3: Check JSONB data structure
 */

SELECT
  transaction_id,
  product_name,
  -- Direct columns
  storage as storage_gb,
  ram as ram_gb,
  -- JSONB extraction
  technical_specs->>'display_size' as display_size_inches,
  technical_specs->>'refresh_rate' as refresh_rate_hz,
  condition_data->>'damage' as damage_status,
  accessories_data->>'original_box' as has_original_box
FROM form_submissions
WHERE user_id = 'user-123-uuid'::uuid
ORDER BY created_at DESC;

-- ═══════════════════════════════════════════════════════════════════════════════

/**
 * VERIFICATION 4: Check template reusability
 * Can template be cloned multiple times?
 */

SELECT
  id,
  template_name,
  is_template,
  transaction_id,
  created_at,
  last_used_at,
  -- Count how many times cloned
  (SELECT COUNT(*) FROM form_submissions fs2
   WHERE fs2.seller_id = form_submissions.seller_id
   AND fs2.product_category = form_submissions.product_category
   AND fs2.is_draft = true) as clones_as_drafts
FROM form_submissions
WHERE
  user_id = 'user-123-uuid'::uuid
  AND is_template = true;

-- ═══════════════════════════════════════════════════════════════════════════════
-- PART 3: CONTRACT DATA FETCHING TEST
-- ═══════════════════════════════════════════════════════════════════════════════

/**
 * TEST: Fetch complete contract data from form
 */

SELECT
  fs.transaction_id,
  fs.product_name,
  fs.brand,
  fs.model,
  fs.description,
  fs.sale_price,
  fs.storage,
  fs.ram,
  fs.processor,
  fs.battery_health_percent,
  fs.power_on_working,
  fs.charging_working,
  fs.expected_delivery_date,
  fs.warranty_info,
  fs.delivery_address,
  -- JSONB data
  fs.technical_specs,
  fs.condition_data,
  fs.accessories_data,
  -- Seller profile (if available)
  ps.full_name as seller_name,
  ps.phone as seller_phone,
  ps.pan_number as seller_pan
FROM form_submissions fs
LEFT JOIN profiles ps ON fs.seller_id = ps.user_id
WHERE fs.transaction_id = 'txn-draft-001'
LIMIT 1;

-- ═══════════════════════════════════════════════════════════════════════════════
-- PART 4: EDGE CASES & CONSTRAINTS
-- ═══════════════════════════════════════════════════════════════════════════════

/**
 * TEST: Constraint - Templates cannot be drafts
 * This should FAIL with constraint violation
 */

-- Uncomment to test:
-- UPDATE form_submissions
-- SET is_draft = true, is_template = true
-- WHERE transaction_id = 'txn-draft-001';
-- ERROR: check constraint "check_template_not_draft" is violated

/**
 * TEST: Constraint - Templates must have name
 * This should FAIL
 */

-- Uncomment to test:
-- UPDATE form_submissions
-- SET is_template = true, template_name = NULL
-- WHERE transaction_id = 'txn-draft-001';
-- ERROR: check constraint "check_template_has_name" is violated

/**
 * TEST: UPSERT on same transaction_id
 * Should update existing draft, not create duplicate
 */

INSERT INTO form_submissions (
  transaction_id,
  user_id,
  seller_id,
  industry_category,
  product_category,
  annexure_code,
  product_name,
  brand,
  sale_price,
  is_draft,
  form_status
)
VALUES (
  'txn-draft-001',
  'user-123-uuid'::uuid,
  'user-123-uuid'::uuid,
  'electronics',
  'mobile_phones',
  'A',
  'iPhone 13 Pro Updated',
  'Apple',
  80000,
  true,
  'draft'
)
ON CONFLICT (transaction_id) DO UPDATE SET
  sale_price = 80000,
  product_name = 'iPhone 13 Pro Updated',
  updated_at = NOW();

-- Verify only one row exists for this transaction
SELECT COUNT(*) as total_rows
FROM form_submissions
WHERE transaction_id = 'txn-draft-001';
-- Result should be: 1 (not duplicated)

-- ═══════════════════════════════════════════════════════════════════════════════
-- PART 5: CLEANUP (Optional)
-- ═══════════════════════════════════════════════════════════════════════════════

/**
 * CLEANUP: Delete test data (if needed)
 */

-- DELETE FROM form_submissions
-- WHERE transaction_id IN ('txn-draft-001', 'txn-new-from-template-001')
-- AND user_id = 'user-123-uuid'::uuid;

-- ═══════════════════════════════════════════════════════════════════════════════
-- END OF TEST DATA FILE
-- ═══════════════════════════════════════════════════════════════════════════════
