-- ===============================================================================
-- COMPREHENSIVE FORM SUBMISSIONS TABLE
-- Stores all form data from 11 different industry categories
-- Designed to handle 280+ unique field names across all industries
-- ===============================================================================

CREATE TABLE IF NOT EXISTS form_submissions (
    -- Primary identifiers
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    transaction_id TEXT UNIQUE NOT NULL,
    
    -- Industry categorization
    industry_category TEXT NOT NULL CHECK (industry_category IN (
        'electronics', 'mobile', 'furniture', 'vehicles', 'jewellery', 
        'fashion-apparel', 'building_material', 'collectibles', 
        'industrial', 'books', 'art'
    )),
    annexure_code TEXT NOT NULL CHECK (annexure_code IN (
        'A', 'B', 'C', 'D', 'F', 'G', 'H', 'I', 'J', 'K', 'L'
    )),
    
    -- ========================================================================
    -- BASIC INFORMATION FIELDS (Common across industries)
    -- ========================================================================
    product_name TEXT,
    item_title TEXT,
    item_name TEXT,
    machine_name TEXT,
    book_title TEXT,
    brand TEXT,
    make TEXT,
    model TEXT,
    model_name TEXT,
    model_number TEXT,
    model_edition TEXT,
    variant TEXT,
    variant_ram_storage TEXT,
    category TEXT,
    jewellery_category TEXT,
    device_type TEXT,
    description TEXT,
    authors TEXT,
    publisher TEXT,
    
    -- ========================================================================
    -- PRICING & DELIVERY INFORMATION
    -- ========================================================================
    price DECIMAL(12,2),
    sale_price DECIMAL(12,2),
    expected_delivery_date DATE,
    inspection_window_hours INTEGER,
    return_policy TEXT,
    delivery_mode TEXT,
    weight_category TEXT,
    
    -- ========================================================================
    -- TECHNICAL SPECIFICATIONS (Stored as JSONB for flexibility)
    -- ========================================================================
    technical_specs JSONB DEFAULT '{}'::jsonb,
    -- Contains: color, storage, ram, display_size, processor, graphics_card,
    -- battery_capacity, manufactured_year, manufacturing_year, registration_year,
    -- voltage_required, phase, power_rating, load_capacity, rpm_output_capacity,
    -- fuel_type, air_pressure, wattage, electrical_quality_grade, etc.
    
    -- ========================================================================
    -- IDENTIFICATION & SERIAL NUMBERS
    -- ========================================================================
    identification_data JSONB DEFAULT '{}'::jsonb,
    -- Contains: serial_number, imei, imei1, imei2, engine_number, chassis_number,
    -- registration_number, batch_number, shade_number, edition_number,
    -- serial_date_code, battery_cycle_count, etc.
    
    -- ========================================================================
    -- CONDITION ASSESSMENT (Comprehensive damage/wear tracking)
    -- ========================================================================
    condition_data JSONB DEFAULT '{}'::jsonb,
    -- Contains: condition_category, condition, scratches, dents, back_dents,
    -- screen_issues, screen_condition, cracks, spots_lines, touch_issues,
    -- buttons_ports_issues, speaker_mic_issues, charging_issues, battery_health_percentage,
    -- heating_issues, network_issues, camera_issues, loose_legs, water_marks,
    -- torn_upholstery, sun_fading, loose_stone, missing_stone, wear_marks,
    -- known_defects, known_issues, frame_damage, resin_bubbles, uneven_gloss, etc.
    
    -- ========================================================================
    -- FUNCTIONALITY TESTS
    -- ========================================================================
    functionality_data JSONB DEFAULT '{}'::jsonb,
    -- Contains: power_on, charging_working, screen_ok, touch_ok, buttons_ok,
    -- speakers_ok, camera_ok, wifi_bluetooth_ok, ports_ok, turns_on, charges,
    -- touchscreen, buttons, wifi_bluetooth, fingerprint_faceid, speaker_mic_functional,
    -- front_back_camera, sim_detection, keyboard_keys, trackpad, usb_hdmi_ports,
    -- webcam, fast_charging_support, laptop_battery_backup, fan_noise, etc.
    
    -- ========================================================================
    -- DIMENSIONS & MEASUREMENTS
    -- ========================================================================
    measurements JSONB DEFAULT '{}'::jsonb,
    -- Contains: length_cm, breadth_cm, height_cm, width_cm, depth_cm,
    -- thickness_mm, slab_thickness, size_label, fit_type, measurements_provided, etc.
    
    -- ========================================================================
    -- MATERIAL & QUALITY INFORMATION
    -- ========================================================================
    material_data JSONB DEFAULT '{}'::jsonb,
    -- Contains: material_type, material_type_purity, finish_type, grade_quality,
    -- purity, gross_weight_grams, net_weight_grams, making_charges_percentage,
    -- wastage_percentage, stone_type, stone_count, carat_weight, clarity,
    -- color_grade, fabric_composition, care_instructions, medium, surface, artwork_type, etc.
    
    -- ========================================================================
    -- ACCESSORIES & INCLUSIONS
    -- ========================================================================
    accessories_data JSONB DEFAULT '{}'::jsonb,
    -- Contains: box, charger, original_charger, cable, earphones, case, manual,
    -- stand_base, remote, laptop_charger, laptop_bag, additional_battery, others,
    -- other_accessories, tools_included, assembly_status, assembly_responsibility,
    -- original_packaging, etc.
    
    -- ========================================================================
    -- WARRANTY & LEGAL STATUS
    -- ========================================================================
    warranty_legal_data JSONB DEFAULT '{}'::jsonb,
    -- Contains: warranty_status, warranty_valid_till, apple_brand_warranty,
    -- third_party_warranty, warranty_valid_until, warranty_info, return_policy_preset,
    -- rc_status, ownership, hypothecation, finance_company_name, insurance_status,
    -- puc_valid_till, noc_availability, icloud_lock_status, google_frp_lock,
    -- mi_account_lock, can_device_be_reset, bios_lock, os_activation_status,
    -- hallmark_available, lab_certificate_available, authenticity_guaranteed,
    -- purchase_receipt_available, brand_tags_present, etc.
    
    -- ========================================================================
    -- CERTIFICATES & DOCUMENTATION
    -- ========================================================================
    documentation_data JSONB DEFAULT '{}'::jsonb,
    -- Contains: certificate_available, memorabilia_coa_available,
    -- authenticity_declaration, coa_provided, etc.
    
    -- ========================================================================
    -- USAGE & HISTORY
    -- ========================================================================
    usage_history_data JSONB DEFAULT '{}'::jsonb,
    -- Contains: odometer_reading, odometer_authenticity, usage_type, accident_history,
    -- flood_damage, paint_condition, tyre_condition_percentage, battery_age,
    -- previous_repairs, battery_replaced, screen_replaced, back_glass_replaced,
    -- motherboard_replaced, ssd_ram_replaced, speaker_replaced, charging_port_replaced,
    -- authorized_service_repair, last_service_date, motor_rewinding, etc.
    
    -- ========================================================================
    -- PHOTO & VIDEO EVIDENCE (File URLs/Paths)
    -- ========================================================================
    media_files JSONB DEFAULT '{}'::jsonb,
    -- Contains: condition_photos, working_demonstration_video, front_view_photo,
    -- back_view_photo, side_photos, serial_number_closeup, accessories_photo,
    -- working_video, condition_issue_photos, battery_health_screenshots,
    -- performance_test_video, working_function_video, imei_screen_video,
    -- damage_photos, stability_test_video, drawer_cabinet_function_test,
    -- defect_photos, thickness_demo_video, 360_video, logo_closeup,
    -- packaging_photos, coa_photos, 360_machine_video, working_test_video,
    -- serial_plate_photo, motor_photo, gearbox_photo, front_cover_photo,
    -- back_cover_photo, spine_photo, interior_page_photos, edition_publisher_page_photo,
    -- isbn_page_photo, front_view, back_view, texture_close_up, frame_edge_condition,
    -- artist_signature, brand_label_photo, defect_closeup_photos,
    -- fitting_demonstration_video, etc.
    
    -- ========================================================================
    -- BUYER REQUIREMENTS (Checkbox verification requirements)
    -- ========================================================================
    buyer_requirements JSONB DEFAULT '{}'::jsonb,
    -- Contains: unboxing_video_required, condition_verification_required,
    -- functionality_test_required, accessories_verification_required,
    -- imei_verification_required, boot_test_required, functional_test_required,
    -- stability_test_required, assembly_verification_required, vehicle_inspection_required,
    -- engine_test_required, document_verification_required, odometer_verification_required,
    -- hallmark_verification, weight_verification, authenticity_verification,
    -- packaging_verification, measurement_verification, batch_verification,
    -- quality_verification, safety_verification, functionality_verification,
    -- documentation_verification, installation_verification, content_verification,
    -- edition_verification, certificate_verification, frame_verification,
    -- size_verification, cleanliness_verification, etc.
    
    -- ========================================================================
    -- CATEGORY-SPECIFIC SPECIAL FIELDS
    -- ========================================================================
    category_specific_data JSONB DEFAULT '{}'::jsonb,
    -- Contains industry-specific fields like: backup_duration_hours, overheating,
    -- watch_movement_type, waterproof_test_done, sole_wear_percentage, creasing,
    -- leather_type, handle_wear, frame_condition, signature_clarity, gender,
    -- sneaker_size, highlighting, underlining, writing, torn_pages, missing_pages,
    -- water_damage, loose_binding, name_written_inside, stickers_tape_cover,
    -- cover_damage, stains_present, holes_tears, fading_present, pilling_present,
    -- zipper_button_condition, defect_description, etc.
    
    -- ========================================================================
    -- DELIVERY & LOGISTICS
    -- ========================================================================
    delivery_data JSONB DEFAULT '{}'::jsonb,
    -- Contains: floor_access_notes, additional_access_notes, assembly_status,
    -- assembly_responsibility, tools_included, odor_assessment, polish_required,
    -- pre_existing_cracks, etc.
    
    -- ========================================================================
    -- FORM METADATA & STATUS
    -- ========================================================================
    form_status TEXT DEFAULT 'draft' CHECK (form_status IN ('draft', 'completed', 'submitted', 'reviewed')),
    completion_percentage INTEGER DEFAULT 0 CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
    required_fields_completed INTEGER DEFAULT 0,
    total_fields_filled INTEGER DEFAULT 0,
    
    -- ========================================================================
    -- TIMESTAMPS & AUDIT TRAIL
    -- ========================================================================
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    submitted_at TIMESTAMPTZ,
    
    -- ========================================================================
    -- INDEXES FOR PERFORMANCE
    -- ========================================================================
    CONSTRAINT fk_form_submissions_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- ===============================================================================
-- INDEXES FOR OPTIMAL QUERY PERFORMANCE
-- ===============================================================================

-- Primary lookup indexes
CREATE INDEX IF NOT EXISTS idx_form_submissions_user_id ON form_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_form_submissions_transaction_id ON form_submissions(transaction_id);
CREATE INDEX IF NOT EXISTS idx_form_submissions_industry_category ON form_submissions(industry_category);
CREATE INDEX IF NOT EXISTS idx_form_submissions_form_status ON form_submissions(form_status);

-- Composite indexes for common queries
CREATE INDEX IF NOT EXISTS idx_form_submissions_user_industry ON form_submissions(user_id, industry_category);
CREATE INDEX IF NOT EXISTS idx_form_submissions_user_status ON form_submissions(user_id, form_status);
CREATE INDEX IF NOT EXISTS idx_form_submissions_created_at ON form_submissions(created_at DESC);

-- JSONB field indexes for fast searches
CREATE INDEX IF NOT EXISTS idx_form_submissions_technical_specs ON form_submissions USING GIN(technical_specs);
CREATE INDEX IF NOT EXISTS idx_form_submissions_condition_data ON form_submissions USING GIN(condition_data);
CREATE INDEX IF NOT EXISTS idx_form_submissions_material_data ON form_submissions USING GIN(material_data);
CREATE INDEX IF NOT EXISTS idx_form_submissions_media_files ON form_submissions USING GIN(media_files);

-- ===============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ===============================================================================

ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

-- Users can only access their own form submissions
CREATE POLICY "Users can view their own form submissions"
    ON form_submissions FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own form submissions"
    ON form_submissions FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own form submissions"
    ON form_submissions FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own form submissions"
    ON form_submissions FOR DELETE
    USING (auth.uid() = user_id);

-- ===============================================================================
-- TRIGGER FOR AUTOMATIC UPDATED_AT TIMESTAMP
-- ===============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_form_submissions_updated_at
    BEFORE UPDATE ON form_submissions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ===============================================================================
-- HELPER FUNCTIONS FOR FORM MANAGEMENT
-- ===============================================================================

-- Function to calculate completion percentage
CREATE OR REPLACE FUNCTION calculate_form_completion(submission_data JSONB)
RETURNS INTEGER AS $$
DECLARE
    total_possible_fields INTEGER := 280; -- Based on our field analysis
    filled_fields INTEGER := 0;
    completion_pct INTEGER;
BEGIN
    -- Count non-null values in all JSONB fields
    SELECT 
        (COALESCE(jsonb_object_length(submission_data->'technical_specs'), 0) +
         COALESCE(jsonb_object_length(submission_data->'identification_data'), 0) +
         COALESCE(jsonb_object_length(submission_data->'condition_data'), 0) +
         COALESCE(jsonb_object_length(submission_data->'functionality_data'), 0) +
         COALESCE(jsonb_object_length(submission_data->'measurements'), 0) +
         COALESCE(jsonb_object_length(submission_data->'material_data'), 0) +
         COALESCE(jsonb_object_length(submission_data->'accessories_data'), 0) +
         COALESCE(jsonb_object_length(submission_data->'warranty_legal_data'), 0) +
         COALESCE(jsonb_object_length(submission_data->'documentation_data'), 0) +
         COALESCE(jsonb_object_length(submission_data->'usage_history_data'), 0) +
         COALESCE(jsonb_object_length(submission_data->'media_files'), 0) +
         COALESCE(jsonb_object_length(submission_data->'buyer_requirements'), 0) +
         COALESCE(jsonb_object_length(submission_data->'category_specific_data'), 0) +
         COALESCE(jsonb_object_length(submission_data->'delivery_data'), 0))
    INTO filled_fields;
    
    -- Calculate percentage
    completion_pct := LEAST(100, (filled_fields * 100) / total_possible_fields);
    
    RETURN completion_pct;
END;
$$ LANGUAGE plpgsql;

-- Function to get form submission by transaction ID
CREATE OR REPLACE FUNCTION get_form_submission_by_transaction(
    p_transaction_id TEXT
)
RETURNS SETOF form_submissions AS $$
BEGIN
    RETURN QUERY
    SELECT * FROM form_submissions
    WHERE transaction_id = p_transaction_id
    AND user_id = auth.uid();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ===============================================================================
-- COMMENTS FOR DOCUMENTATION
-- ===============================================================================

COMMENT ON TABLE form_submissions IS 'Comprehensive form submissions table storing data from 11 industry categories with 280+ unique fields';
COMMENT ON COLUMN form_submissions.technical_specs IS 'JSONB field storing technical specifications like color, storage, RAM, processor, etc.';
COMMENT ON COLUMN form_submissions.condition_data IS 'JSONB field storing condition assessment data including scratches, dents, functionality issues';
COMMENT ON COLUMN form_submissions.media_files IS 'JSONB field storing file URLs/paths for photos, videos, and documents';
COMMENT ON COLUMN form_submissions.buyer_requirements IS 'JSONB field storing buyer verification requirements as checkboxes';
COMMENT ON COLUMN form_submissions.completion_percentage IS 'Auto-calculated percentage of form completion based on filled fields';