/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * BHAROSE PE - CONTRACT GENERATION & FORM REUSABILITY SYSTEM
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * UPDATED: November 28, 2025
 * 
 * FEATURES:
 * 1. Draft Saving - Users save incomplete forms and resume later
 * 2. Form Reusability - Save completed forms as reusable templates
 * 3. Quick Population - Clone template into new transaction with one click
 * 4. Hybrid Storage - Direct columns (70) + JSONB columns (16) for flexibility
 * 5. Contract Generation - Fetch data from BOTH direct & JSONB columns
 * 
 * WORKS FOR: Both Goods (A-K Annexures) and Services (A-I Annexures)
 * 
 * Data is fetched from:
 * - form_submissions table (product/transaction details + JSONB)
 * - profiles table (buyer/seller personal info)
 * - transactions table (payment/escrow details if available)
 * - contract metadata (timestamps, status)
 */

-- ═══════════════════════════════════════════════════════════════════════════════
-- SECTION 1: DRAFT SAVING OPERATIONS
-- ═══════════════════════════════════════════════════════════════════════════════

/**
 * QUERY 1.1: SAVE FORM AS DRAFT
 * When user clicks "Save Draft" button
 */

INSERT INTO form_submissions (
  user_id, seller_id, buyer_id, transaction_id, industry_category, product_category,
  annexure_code, product_name, brand, model, description, condition_category,
  sale_price, delivery_method, delivery_address, expected_delivery_date,
  warranty_status, warranty_info, storage, ram, processor,
  technical_specs, condition_data, functionality_data, accessories_data,
  is_draft, form_status, updated_at
)
VALUES (
  $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12,
  $13, $14, $15, $16, $17, $18, $19, $20, $21,
  $22::jsonb, $23::jsonb, $24::jsonb, $25::jsonb,
  true, 'draft', NOW()
)
ON CONFLICT (transaction_id) DO UPDATE SET
  product_name = COALESCE(EXCLUDED.product_name, form_submissions.product_name),
  brand = COALESCE(EXCLUDED.brand, form_submissions.brand),
  sale_price = COALESCE(EXCLUDED.sale_price, form_submissions.sale_price),
  storage = COALESCE(EXCLUDED.storage, form_submissions.storage),
  ram = COALESCE(EXCLUDED.ram, form_submissions.ram),
  processor = COALESCE(EXCLUDED.processor, form_submissions.processor),
  technical_specs = form_submissions.technical_specs || COALESCE(EXCLUDED.technical_specs, '{}'::jsonb),
  condition_data = form_submissions.condition_data || COALESCE(EXCLUDED.condition_data, '{}'::jsonb),
  functionality_data = form_submissions.functionality_data || COALESCE(EXCLUDED.functionality_data, '{}'::jsonb),
  accessories_data = form_submissions.accessories_data || COALESCE(EXCLUDED.accessories_data, '{}'::jsonb),
  updated_at = NOW()
RETURNING id, transaction_id, form_status;

-- ═══════════════════════════════════════════════════════════════════════════════

/**
 * QUERY 1.2: FETCH DRAFT BY TRANSACTION ID
 * Restore user's previously saved draft
 */

SELECT *
FROM form_submissions
WHERE
  transaction_id = $1
  AND user_id = $2
  AND is_draft = true
LIMIT 1;

-- ═══════════════════════════════════════════════════════════════════════════════

/**
 * QUERY 1.3: SUBMIT DRAFT (Mark as Completed)
 * When user clicks "Submit Form"
 */

UPDATE form_submissions
SET
  is_draft = false,
  form_status = 'completed',
  submitted_at = NOW()
WHERE
  transaction_id = $1
  AND user_id = $2
RETURNING id, form_status, submitted_at;

-- ═══════════════════════════════════════════════════════════════════════════════
-- SECTION 2: FORM REUSABILITY OPERATIONS
-- ═══════════════════════════════════════════════════════════════════════════════

/**
 * QUERY 2.1: MARK FORM AS REUSABLE TEMPLATE
 * When user clicks "Save as Template"
 */

UPDATE form_submissions
SET
  is_template = true,
  template_name = $1,
  template_category = industry_category,
  form_status = 'completed'
WHERE
  transaction_id = $2
  AND user_id = $3
RETURNING id, template_name, industry_category;

-- ═══════════════════════════════════════════════════════════════════════════════

/**
 * QUERY 2.2: FETCH USER'S REUSABLE TEMPLATES
 * Show when user starts new form: "Want to use a saved template?"
 */

SELECT
  id,
  transaction_id,
  template_name,
  product_name,
  brand,
  model,
  product_category,
  condition_category,
  sale_price,
  warranty_status,
  created_at,
  last_used_at
FROM form_submissions
WHERE
  user_id = $1
  AND is_template = true
  AND industry_category = $2
ORDER BY last_used_at DESC NULLS LAST
LIMIT 5;

-- ═══════════════════════════════════════════════════════════════════════════════

/**
 * QUERY 2.3: FETCH SELLER'S TEMPLATES (Suggest to seller)
 * Example: "Want to use your previous iPhone listing template?"
 */

SELECT
  id,
  template_name,
  product_name,
  brand,
  model,
  condition_category,
  sale_price,
  last_used_at
FROM form_submissions
WHERE
  seller_id = $1
  AND is_template = true
  AND product_category = $2
ORDER BY last_used_at DESC NULLS LAST
LIMIT 3;

-- ═══════════════════════════════════════════════════════════════════════════════

/**
 * QUERY 2.4: CREATE NEW FORM FROM TEMPLATE (Clone)
 * When user clicks "Use This Template"
 */

INSERT INTO form_submissions (
  user_id, seller_id, buyer_id, transaction_id, industry_category, product_category,
  annexure_code, product_name, brand, model, description, condition_category, color,
  sale_price, delivery_method, delivery_address, expected_delivery_date,
  warranty_status, warranty_valid_until, warranty_info, return_policy,
  storage, ram, display_size, processor, battery_capacity, battery_health_percent,
  scratches_present, dents_present, power_on_working, charging_working,
  screen_ok, buttons_ok, speakers_ok, camera_ok, wifi_bluetooth_ok, ports_ok,
  technical_specs, condition_data, functionality_data, accessories_data,
  warranty_legal_data, measurements, material_data, media_files, category_specific_data,
  is_draft, is_template, form_status, created_at, updated_at
)
SELECT
  $3, seller_id, NULL, $2, industry_category, product_category,
  annexure_code, product_name, brand, model, description, condition_category, color,
  sale_price, delivery_method, delivery_address, expected_delivery_date,
  warranty_status, warranty_valid_until, warranty_info, return_policy,
  storage, ram, display_size, processor, battery_capacity, battery_health_percent,
  scratches_present, dents_present, power_on_working, charging_working,
  screen_ok, buttons_ok, speakers_ok, camera_ok, wifi_bluetooth_ok, ports_ok,
  technical_specs, condition_data, functionality_data, accessories_data,
  warranty_legal_data, measurements, material_data, media_files, category_specific_data,
  true, false, 'draft', NOW(), NOW()
FROM form_submissions
WHERE id = $1 AND is_template = true;

-- Update template's last_used_at
UPDATE form_submissions
SET last_used_at = NOW()
WHERE id = $1;

-- ═══════════════════════════════════════════════════════════════════════════════
-- SECTION 3: CONTRACT GENERATION WITH HYBRID STORAGE
-- ═══════════════════════════════════════════════════════════════════════════════

/**
 * QUERY 3.1: GET ALL CONTRACT DATA FOR A SPECIFIC TRANSACTION
 * Fetch COMPLETE contract data (direct columns + JSONB)
 * Works for BOTH GOODS and SERVICES
 */

SELECT
    -- Transaction & Contract Info
    fs.transaction_id,
    fs.id AS form_submission_id,
    fs.created_at AS contract_generated_at,
    
    -- Seller Info (from profiles table using seller_id)
    fs.seller_id,
    ps.full_name AS seller_full_name,
    ps.phone AS seller_phone,
    ps.user_id AS seller_user_id,
    ps.address AS seller_address,
    ps.city AS seller_city,
    ps.state AS seller_state,
    ps.pincode AS seller_pincode,
    ps.pan_number AS seller_pan_number,
    ps.gst_number AS seller_gst_number,
    
    -- Buyer Info (from profiles table using buyer_id)
    fs.buyer_id,
    pb.full_name AS buyer_full_name,
    pb.phone AS buyer_phone,
    pb.user_id AS buyer_user_id,
    pb.address AS buyer_address,
    pb.city AS buyer_city,
    pb.state AS buyer_state,
    pb.pincode AS buyer_pincode,
    pb.pan_number AS buyer_pan_number,
    pb.gst_number AS buyer_gst_number,
    
    -- Product Details (Part B)
    fs.product_name,
    fs.brand,
    fs.model,
    fs.imei,
    fs.serial_number,
    fs.condition,
    fs.description,
    fs.known_defects,
    fs.expected_delivery_date,
    fs.warranty_info,
    fs.return_policy,
    fs.inspection_window_hours,
    
    -- Delivery Address (Buyer's from profiles)
    pb.address AS delivery_address,
    pb.city AS delivery_city,
    pb.state AS delivery_state,
    pb.pincode AS delivery_pincode,
    
    -- Condition Data (from JSONB)
    fs.condition_data,
    fs.technical_specs,
    fs.accessories_data,
    fs.warranty_legal_data,
    fs.media_files,
    fs.functionality_data,
    fs.measurements,
    fs.material_data,
    fs.category_specific_data,
    
    -- Payment & Escrow (from transactions table if available)
    -- fs.price AS transaction_amount,  -- Add from transactions table if needed
    
    -- Status & Timestamps
    fs.form_status,
    fs.submitted_at
    
FROM form_submissions fs
LEFT JOIN profiles ps ON fs.seller_id = ps.user_id
LEFT JOIN profiles pb ON fs.buyer_id = pb.user_id
WHERE fs.transaction_id = {{transaction_id}}
LIMIT 1;

-- ═══════════════════════════════════════════════════════════════════════════════
-- QUERY 3.2: Verify Seller & Buyer Exist
-- ═══════════════════════════════════════════════════════════════════════════════

SELECT
    user_id,
    full_name,
    phone,
    pan_number,
    gst_number,
    address,
    city,
    state,
    pincode
FROM profiles
WHERE user_id IN (
    SELECT DISTINCT seller_id FROM form_submissions WHERE transaction_id = $1
    UNION
    SELECT DISTINCT buyer_id FROM form_submissions WHERE transaction_id = $1
);

-- ═══════════════════════════════════════════════════════════════════════════════
-- QUERY 3.3: Get Product Details with All Condition Fields
-- ═══════════════════════════════════════════════════════════════════════════════

SELECT
    -- Product Identification
    product_name,
    brand,
    model,
    item_title,
    category,
    device_type,
    
    -- Identification Numbers
    imei,
    serial_number,
    condition_category,
    
    -- Condition & Defects
    condition,
    known_defects,
    scratches_present,
    dents_present,
    cracks,
    screen_ok,
    camera_ok,
    touchscreen,
    power_on_working,
    charging_working,
    battery_health_percent,
    
    -- Functionality Details
    buttons_ok,
    speakers_ok,
    wifi_bluetooth_ok,
    ports_ok,
    
    -- Accessories
    accessories_data,
    original_box,
    original_charger,
    case_included,
    manual,
    
    -- Warranty
    warranty_info,
    warranty_valid_until,
    warranty_status,
    
    -- Delivery
    expected_delivery_date,
    delivery_mode,
    inspection_window_hours,
    return_policy,
    
    -- Media
    media_files,
    
    -- Formatted Description (for contract)
    description
    
FROM form_submissions
WHERE transaction_id = $1;

-- ═══════════════════════════════════════════════════════════════════════════════
-- SECTION 4: JSONB QUERY EXAMPLES
-- ═══════════════════════════════════════════════════════════════════════════════

/**
 * QUERY 4.1: Extract specific JSONB fields for contract
 */

SELECT
  transaction_id,
  product_name,
  brand,
  sale_price,
  -- Extract JSONB data using -> (get object) and ->> (get text)
  technical_specs->>'processor' as processor,
  (technical_specs->>'storage')::int as storage_gb,
  condition_data->>'damage_description' as damage_notes,
  accessories_data->>'original_box' as has_original_box,
  jsonb_array_length(media_files->'photos') as total_photos
FROM form_submissions
WHERE transaction_id = $1;

-- ═══════════════════════════════════════════════════════════════════════════════

/**
 * QUERY 4.2: Search templates by JSONB criteria
 * Example: Find all processor types containing 'Snapdragon'
 */

SELECT
  id,
  template_name,
  product_name,
  technical_specs->>'processor' as processor
FROM form_submissions
WHERE
  user_id = $1
  AND is_template = true
  AND industry_category = 'electronics'
  AND technical_specs @> '{"processor": "Snapdragon"}'::jsonb;

-- ═══════════════════════════════════════════════════════════════════════════════

/**
 * QUERY 4.3: Update JSONB with new values (merge)
 */

UPDATE form_submissions
SET
  technical_specs = technical_specs || '{"processor": "A17 Pro", "ram": 8}'::jsonb,
  condition_data = condition_data || '{"battery_health": 85}'::jsonb,
  updated_at = NOW()
WHERE transaction_id = $1
RETURNING technical_specs, condition_data;

-- ═══════════════════════════════════════════════════════════════════════════════
-- SECTION 5: ANALYTICS & REPORTING
-- ═══════════════════════════════════════════════════════════════════════════════

/**
 * QUERY 5.1: User dashboard stats
 */

SELECT
  COUNT(*) FILTER (WHERE is_draft = true) as draft_count,
  COUNT(*) FILTER (WHERE is_template = true) as template_count,
  COUNT(*) FILTER (WHERE form_status = 'completed') as completed_count,
  COUNT(*) as total_forms
FROM form_submissions
WHERE user_id = $1;

-- ═══════════════════════════════════════════════════════════════════════════════

/**
 * QUERY 5.2: All user drafts (work in progress)
 */

SELECT
  id,
  transaction_id,
  product_name,
  brand,
  industry_category,
  completion_percentage,
  updated_at
FROM form_submissions
WHERE user_id = $1 AND is_draft = true
ORDER BY updated_at DESC
LIMIT 20;

-- ═══════════════════════════════════════════════════════════════════════════════

/**
 * QUERY 5.3: Template usage analytics
 */

SELECT
  id,
  template_name,
  product_name,
  brand,
  created_at,
  last_used_at,
  COUNT(*) OVER (PARTITION BY id) as total_usage
FROM form_submissions
WHERE user_id = $1 AND is_template = true
ORDER BY last_used_at DESC NULLS LAST;
