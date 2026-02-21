-- ═══════════════════════════════════════════════════════════════════════════════
-- FINAL CONTRACT DATA QUERY - 100% VERIFIED COLUMN NAMES
-- Usage: Pass buyer_uuid and seller_uuid from console
-- ═══════════════════════════════════════════════════════════════════════════════

-- QUERY 1: FETCH COMPLETE CONTRACT DATA
-- Input Parameters: 
--   $1 = transaction_id (text)
--   $2 = buyer_uuid (uuid)
--   $3 = seller_uuid (uuid)

SELECT 
    -- TRANSACTION & FORM SUBMISSION IDS
    fs.id as form_submission_id,
    fs.transaction_id,
    fs.user_id,
    fs.industry_category,
    fs.annexure_code,
    
    -- PRODUCT IDENTIFICATION
    COALESCE(fs.product_name, fs.item_title, fs.item_name, fs.machine_name, fs.book_title) as product_name,
    fs.brand,
    fs.model,
    fs.category,
    fs.device_type,
    fs.color,
    fs.variant,
    fs.variant_ram_storage,
    fs.serial_number,
    fs.imei_2,
    (fs.identification_data->>'imei') as imei,
    
    -- PRODUCT SPECIFICATIONS
    fs.storage,
    fs.ram,
    fs.display_size,
    fs.processor,
    fs.graphics_card,
    fs.battery_capacity,
    fs.manufactured_year,
    
    -- PRODUCT CONDITION
    fs.condition_category as condition,
    fs.description,
    fs.screen_condition,
    fs.battery_health_percent,
    
    -- CONDITION BOOLEANS - PHYSICAL
    fs.scratches_present,
    fs.dents_present,
    fs.cracks,
    fs.spots_lines,
    fs.heating_issues,
    fs.water_marks,
    
    -- CONDITION BOOLEANS - FUNCTIONALITY
    fs.power_on_working,
    fs.charging_working,
    fs.screen_ok,
    fs.buttons_ok,
    fs.speakers_ok,
    fs.camera_ok,
    fs.wifi_bluetooth_ok,
    fs.ports_ok,
    fs.touchscreen,
    fs.camera_issues,
    fs.network_issues,
    fs.fingerprint_faceid,
    fs.speaker_mic_functional,
    fs.sim_detection,
    fs.keyboard_keys,
    fs.trackpad,
    fs.usb_hdmi_ports,
    fs.webcam,
    
    -- ACCESSORIES BOOLEANS
    fs.cable,
    fs.earphones,
    fs.case_included,
    fs.manual,
    fs.stand_base,
    fs.remote,
    fs.laptop_charger,
    fs.laptop_bag,
    
    -- ACCESSORIES DATA (JSON)
    (fs.accessories_data->>'original_box')::boolean as original_box,
    (fs.accessories_data->>'original_charger')::boolean as original_charger,
    (fs.accessories_data->>'other_accessories') as other_accessories,
    
    -- WARRANTY DATA (JSON)
    (fs.warranty_legal_data->>'warranty_status') as warranty_status,
    (fs.warranty_legal_data->>'warranty_valid_until') as warranty_valid_until,
    (fs.warranty_legal_data->>'warranty_info') as warranty_info,
    
    -- PRICING & DELIVERY
    fs.price,
    fs.sale_price,
    fs.expected_delivery_date,
    fs.delivery_mode,
    fs.inspection_window_hours,
    fs.return_policy,
    
    -- FORM STATUS
    fs.form_status,
    fs.completion_percentage,
    fs.created_at as form_created_at,
    fs.updated_at as form_updated_at,
    fs.submitted_at,
    
    -- SELLER INFORMATION (from profiles)
    seller.id as seller_id,
    seller.full_name as seller_full_name,
    seller.phone as seller_phone,
    seller.email as seller_email,
    seller.address as seller_address,
    seller.city as seller_city,
    seller.state as seller_state,
    seller.pincode as seller_pincode,
    seller.pan_number as seller_pan_number,
    seller.gst_number as seller_gst_number,
    seller.business_name as seller_business_name,
    seller.business_type as seller_business_type,
    seller.verified_phone as seller_verified_phone,
    seller.avatar_url as seller_avatar_url,
    
    -- BUYER INFORMATION (from profiles)
    buyer.id as buyer_id,
    buyer.full_name as buyer_full_name,
    buyer.phone as buyer_phone,
    buyer.email as buyer_email,
    buyer.address as buyer_address,
    buyer.city as buyer_city,
    buyer.state as buyer_state,
    buyer.pincode as buyer_pincode,
    buyer.pan_number as buyer_pan_number,
    buyer.gst_number as buyer_gst_number,
    buyer.business_name as buyer_business_name,
    buyer.business_type as buyer_business_type,
    buyer.verified_phone as buyer_verified_phone,
    buyer.avatar_url as buyer_avatar_url,
    
    -- TRANSACTION INFORMATION
    t.title as transaction_title,
    t.amount,
    t.status as transaction_status,
    t.delivery_date as transaction_delivery_date,
    t.work_marked_done_at,
    t.payment_released_at,
    t.dispute_details,
    t.dispute_reason,
    t.has_evidence,
    (t.resolution_breakdown) as resolution_breakdown

FROM form_submissions fs
LEFT JOIN profiles seller ON seller.id = $3  -- seller_uuid parameter
LEFT JOIN profiles buyer ON buyer.id = $2    -- buyer_uuid parameter
LEFT JOIN transactions t ON t.id = (
    SELECT id FROM transactions 
    WHERE (buyer_id = $2 AND seller_id = $3) 
    OR (buyer_id = $3 AND seller_id = $2)
    LIMIT 1
)
WHERE fs.transaction_id = $1;

-- ═══════════════════════════════════════════════════════════════════════════════

-- QUERY 2: VERIFY SELLER/BUYER EXIST
-- Input Parameters: 
--   $1 = seller_uuid (uuid)
--   $2 = buyer_uuid (uuid)

SELECT 
    COUNT(CASE WHEN id = $1 THEN 1 END) as seller_exists,
    COUNT(CASE WHEN id = $2 THEN 1 END) as buyer_exists
FROM profiles
WHERE id IN ($1, $2);

-- ═══════════════════════════════════════════════════════════════════════════════

-- QUERY 3: GET PRODUCT DETAILS WITH ALL CONDITIONS
-- Input Parameters:
--   $1 = transaction_id (text)

SELECT 
    fs.id,
    fs.transaction_id,
    fs.product_name,
    fs.brand,
    fs.model,
    fs.condition_category,
    fs.battery_health_percent,
    -- All condition flags
    json_build_object(
        'scratches_present', fs.scratches_present,
        'dents_present', fs.dents_present,
        'power_on_working', fs.power_on_working,
        'charging_working', fs.charging_working,
        'touchscreen', fs.touchscreen,
        'camera_ok', fs.camera_ok,
        'screen_ok', fs.screen_ok,
        'buttons_ok', fs.buttons_ok,
        'speakers_ok', fs.speakers_ok,
        'wifi_bluetooth_ok', fs.wifi_bluetooth_ok,
        'ports_ok', fs.ports_ok,
        'cracks', fs.cracks,
        'spots_lines', fs.spots_lines,
        'heating_issues', fs.heating_issues,
        'network_issues', fs.network_issues,
        'camera_issues', fs.camera_issues,
        'water_marks', fs.water_marks
    ) as condition_flags,
    -- All accessories
    json_build_object(
        'cable', fs.cable,
        'earphones', fs.earphones,
        'case_included', fs.case_included,
        'manual', fs.manual,
        'stand_base', fs.stand_base,
        'remote', fs.remote,
        'laptop_charger', fs.laptop_charger,
        'laptop_bag', fs.laptop_bag
    ) as accessories_included
FROM form_submissions fs
WHERE fs.transaction_id = $1;

-- ═══════════════════════════════════════════════════════════════════════════════
