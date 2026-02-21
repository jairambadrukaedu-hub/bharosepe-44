/**
 * MIGRATION: Add All Individual Form Field Columns to form_submissions
 * 
 * Purpose: Convert from grouped JSONB storage to individual columns
 * This allows direct access to all form fields without nested object parsing
 * 
 * Benefits:
 * 1. Contract template can directly reference {{scratches_present}} instead of {{condition_data.scratches}}
 * 2. Better query performance with indexed columns
 * 3. Easier data validation at database level
 * 4. Simpler data retrieval in contract engine
 * 
 * Migration Strategy:
 * - Add all new columns as nullable TEXT/BOOLEAN/INT
 * - Existing JSONB columns remain for backward compatibility
 * - New code stores data in both places during transition
 * - After testing, old JSONB columns can be removed
 */

-- ═══════════════════════════════════════════════════════════════════════════════
-- ENSURE form_submissions TABLE EXISTS WITH BASE COLUMNS
-- ═══════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.form_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id UUID UNIQUE NOT NULL,
  seller_id UUID,
  buyer_id UUID,
  product_category VARCHAR(50),
  annexure_code CHAR(1),
  form_status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Add base columns if they don't exist
ALTER TABLE public.form_submissions
ADD COLUMN IF NOT EXISTS seller_id UUID,
ADD COLUMN IF NOT EXISTS buyer_id UUID,
ADD COLUMN IF NOT EXISTS product_category VARCHAR(50),
ADD COLUMN IF NOT EXISTS annexure_code CHAR(1),
ADD COLUMN IF NOT EXISTS form_status VARCHAR(50) DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT NOW();

-- ═══════════════════════════════════════════════════════════════════════════════
-- SECTION 1: BASIC PRODUCT IDENTIFICATION FIELDS
-- ═══════════════════════════════════════════════════════════════════════════════

ALTER TABLE public.form_submissions
ADD COLUMN IF NOT EXISTS product_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS brand VARCHAR(100),
ADD COLUMN IF NOT EXISTS model_number VARCHAR(100),
ADD COLUMN IF NOT EXISTS serial_number VARCHAR(100),
ADD COLUMN IF NOT EXISTS description TEXT,
ADD COLUMN IF NOT EXISTS sale_price DECIMAL(12, 2),
ADD COLUMN IF NOT EXISTS delivery_method VARCHAR(50),
ADD COLUMN IF NOT EXISTS delivery_address TEXT;

-- ═══════════════════════════════════════════════════════════════════════════════
-- SECTION 2: TECHNICAL SPECIFICATIONS (Color, Storage, RAM, etc.)
-- ═══════════════════════════════════════════════════════════════════════════════

ALTER TABLE public.form_submissions
ADD COLUMN IF NOT EXISTS color VARCHAR(50),
ADD COLUMN IF NOT EXISTS storage VARCHAR(100),
ADD COLUMN IF NOT EXISTS ram VARCHAR(100),
ADD COLUMN IF NOT EXISTS variant_ram_storage VARCHAR(100),
ADD COLUMN IF NOT EXISTS display_size VARCHAR(50),
ADD COLUMN IF NOT EXISTS processor VARCHAR(100),
ADD COLUMN IF NOT EXISTS graphics_card VARCHAR(100),
ADD COLUMN IF NOT EXISTS battery_capacity VARCHAR(50),
ADD COLUMN IF NOT EXISTS manufactured_year INT,
ADD COLUMN IF NOT EXISTS fuel_type VARCHAR(50),
ADD COLUMN IF NOT EXISTS voltage_required VARCHAR(50),
ADD COLUMN IF NOT EXISTS phase VARCHAR(50),
ADD COLUMN IF NOT EXISTS power_rating VARCHAR(50),
ADD COLUMN IF NOT EXISTS wattage VARCHAR(50),
ADD COLUMN IF NOT EXISTS load_capacity VARCHAR(50),
ADD COLUMN IF NOT EXISTS rpm_output_capacity VARCHAR(50),
ADD COLUMN IF NOT EXISTS air_pressure VARCHAR(50),
ADD COLUMN IF NOT EXISTS electrical_quality_grade VARCHAR(50);

-- ═══════════════════════════════════════════════════════════════════════════════
-- SECTION 3: IDENTIFICATION DATA (IMEI, Serial, Registration Numbers, etc.)
-- ═══════════════════════════════════════════════════════════════════════════════

ALTER TABLE public.form_submissions
ADD COLUMN IF NOT EXISTS imei VARCHAR(20),
ADD COLUMN IF NOT EXISTS imei_1 VARCHAR(20),
ADD COLUMN IF NOT EXISTS imei_2 VARCHAR(20),
ADD COLUMN IF NOT EXISTS imei1 VARCHAR(20),
ADD COLUMN IF NOT EXISTS imei2 VARCHAR(20),
ADD COLUMN IF NOT EXISTS engine_number VARCHAR(100),
ADD COLUMN IF NOT EXISTS chassis_number VARCHAR(100),
ADD COLUMN IF NOT EXISTS registration_number VARCHAR(100),
ADD COLUMN IF NOT EXISTS batch_number VARCHAR(100),
ADD COLUMN IF NOT EXISTS shade_number VARCHAR(100),
ADD COLUMN IF NOT EXISTS edition_number VARCHAR(100),
ADD COLUMN IF NOT EXISTS battery_cycle_count INT;

-- ═══════════════════════════════════════════════════════════════════════════════
-- SECTION 4: CONDITION ASSESSMENT (Scratches, Dents, Damages, etc.)
-- ═══════════════════════════════════════════════════════════════════════════════

ALTER TABLE public.form_submissions
ADD COLUMN IF NOT EXISTS condition_category VARCHAR(50),
ADD COLUMN IF NOT EXISTS condition VARCHAR(50),
ADD COLUMN IF NOT EXISTS scratches VARCHAR(50),
ADD COLUMN IF NOT EXISTS scratches_present VARCHAR(50),
ADD COLUMN IF NOT EXISTS dents VARCHAR(50),
ADD COLUMN IF NOT EXISTS dents_present VARCHAR(50),
ADD COLUMN IF NOT EXISTS back_dents VARCHAR(50),
ADD COLUMN IF NOT EXISTS screen_condition VARCHAR(100),
ADD COLUMN IF NOT EXISTS cracks VARCHAR(50),
ADD COLUMN IF NOT EXISTS spots_lines VARCHAR(50),
ADD COLUMN IF NOT EXISTS touch_issues VARCHAR(50),
ADD COLUMN IF NOT EXISTS charging_issues VARCHAR(50),
ADD COLUMN IF NOT EXISTS charging_port_issues VARCHAR(50),
ADD COLUMN IF NOT EXISTS battery_health_percentage INT,
ADD COLUMN IF NOT EXISTS battery_health_percent INT,
ADD COLUMN IF NOT EXISTS battery_health_iphone VARCHAR(50),
ADD COLUMN IF NOT EXISTS heating_issues VARCHAR(50),
ADD COLUMN IF NOT EXISTS network_issues VARCHAR(50),
ADD COLUMN IF NOT EXISTS camera_issues VARCHAR(50),
ADD COLUMN IF NOT EXISTS water_marks VARCHAR(50),
ADD COLUMN IF NOT EXISTS torn_upholstery VARCHAR(50),
ADD COLUMN IF NOT EXISTS sun_fading VARCHAR(50),
ADD COLUMN IF NOT EXISTS loose_stone VARCHAR(50),
ADD COLUMN IF NOT EXISTS missing_stone VARCHAR(50),
ADD COLUMN IF NOT EXISTS loose_legs VARCHAR(50),
ADD COLUMN IF NOT EXISTS known_defects TEXT,
ADD COLUMN IF NOT EXISTS known_issues TEXT,
ADD COLUMN IF NOT EXISTS other_damages TEXT,
ADD COLUMN IF NOT EXISTS buttons_ports_issues TEXT,
ADD COLUMN IF NOT EXISTS screen_issues TEXT,
ADD COLUMN IF NOT EXISTS speaker_mic_issues TEXT,
ADD COLUMN IF NOT EXISTS battery_performance_issues TEXT,
ADD COLUMN IF NOT EXISTS odor_assessment VARCHAR(100),
ADD COLUMN IF NOT EXISTS no_damages BOOLEAN;

-- ═══════════════════════════════════════════════════════════════════════════════
-- SECTION 5: FUNCTIONALITY & WORKING STATUS (Power on, Charging, Buttons, etc.)
-- ═══════════════════════════════════════════════════════════════════════════════

ALTER TABLE public.form_submissions
ADD COLUMN IF NOT EXISTS power_on VARCHAR(10),
ADD COLUMN IF NOT EXISTS power_on_working VARCHAR(10),
ADD COLUMN IF NOT EXISTS turns_on VARCHAR(10),
ADD COLUMN IF NOT EXISTS charging_working VARCHAR(10),
ADD COLUMN IF NOT EXISTS charges VARCHAR(10),
ADD COLUMN IF NOT EXISTS screen_ok VARCHAR(10),
ADD COLUMN IF NOT EXISTS touch_ok VARCHAR(10),
ADD COLUMN IF NOT EXISTS buttons_ok VARCHAR(10),
ADD COLUMN IF NOT EXISTS speakers_ok VARCHAR(10),
ADD COLUMN IF NOT EXISTS camera_ok VARCHAR(10),
ADD COLUMN IF NOT EXISTS wifi_bluetooth_ok VARCHAR(10),
ADD COLUMN IF NOT EXISTS ports_ok VARCHAR(10),
ADD COLUMN IF NOT EXISTS touchscreen VARCHAR(10),
ADD COLUMN IF NOT EXISTS buttons VARCHAR(10),
ADD COLUMN IF NOT EXISTS wifi_bluetooth VARCHAR(10),
ADD COLUMN IF NOT EXISTS fingerprint_faceid VARCHAR(10),
ADD COLUMN IF NOT EXISTS speaker_mic_functional VARCHAR(10),
ADD COLUMN IF NOT EXISTS front_back_camera VARCHAR(10),
ADD COLUMN IF NOT EXISTS sim_detection VARCHAR(10),
ADD COLUMN IF NOT EXISTS keyboard_keys VARCHAR(10),
ADD COLUMN IF NOT EXISTS trackpad VARCHAR(10),
ADD COLUMN IF NOT EXISTS usb_hdmi_ports VARCHAR(10),
ADD COLUMN IF NOT EXISTS webcam VARCHAR(10),
ADD COLUMN IF NOT EXISTS fast_charging_support VARCHAR(10),
ADD COLUMN IF NOT EXISTS drawer_cabinet_function_test VARCHAR(10),
ADD COLUMN IF NOT EXISTS fan_noise VARCHAR(50),
ADD COLUMN IF NOT EXISTS overheating VARCHAR(10);

-- ═══════════════════════════════════════════════════════════════════════════════
-- SECTION 6: ACCESSORIES & INCLUSIONS (Box, Charger, Cables, etc.)
-- ═══════════════════════════════════════════════════════════════════════════════

ALTER TABLE public.form_submissions
ADD COLUMN IF NOT EXISTS box VARCHAR(50),
ADD COLUMN IF NOT EXISTS original_box VARCHAR(50),
ADD COLUMN IF NOT EXISTS original_box_included VARCHAR(50),
ADD COLUMN IF NOT EXISTS charger VARCHAR(50),
ADD COLUMN IF NOT EXISTS original_charger VARCHAR(50),
ADD COLUMN IF NOT EXISTS original_charger_included VARCHAR(50),
ADD COLUMN IF NOT EXISTS cable VARCHAR(50),
ADD COLUMN IF NOT EXISTS earphones VARCHAR(50),
ADD COLUMN IF NOT EXISTS "case" VARCHAR(50),
ADD COLUMN IF NOT EXISTS manual VARCHAR(50),
ADD COLUMN IF NOT EXISTS stand_base VARCHAR(50),
ADD COLUMN IF NOT EXISTS remote VARCHAR(50),
ADD COLUMN IF NOT EXISTS laptop_charger VARCHAR(50),
ADD COLUMN IF NOT EXISTS laptop_bag VARCHAR(50),
ADD COLUMN IF NOT EXISTS additional_battery VARCHAR(50),
ADD COLUMN IF NOT EXISTS others VARCHAR(255),
ADD COLUMN IF NOT EXISTS other_accessories VARCHAR(255),
ADD COLUMN IF NOT EXISTS tools_included VARCHAR(50),
ADD COLUMN IF NOT EXISTS original_packaging VARCHAR(50);

-- ═══════════════════════════════════════════════════════════════════════════════
-- SECTION 7: WARRANTY & LEGAL STATUS
-- ═══════════════════════════════════════════════════════════════════════════════

ALTER TABLE public.form_submissions
ADD COLUMN IF NOT EXISTS warranty_status VARCHAR(100),
ADD COLUMN IF NOT EXISTS warranty_valid_till TIMESTAMP,
ADD COLUMN IF NOT EXISTS warranty_valid_until TIMESTAMP,
ADD COLUMN IF NOT EXISTS warranty_info TEXT,
ADD COLUMN IF NOT EXISTS third_party_warranty VARCHAR(50),
ADD COLUMN IF NOT EXISTS apple_brand_warranty VARCHAR(50),
ADD COLUMN IF NOT EXISTS rc_status VARCHAR(50),
ADD COLUMN IF NOT EXISTS ownership VARCHAR(50),
ADD COLUMN IF NOT EXISTS insurance_status VARCHAR(50),
ADD COLUMN IF NOT EXISTS puc_valid_till TIMESTAMP,
ADD COLUMN IF NOT EXISTS icloud_lock_status VARCHAR(50),
ADD COLUMN IF NOT EXISTS google_frp_lock VARCHAR(50),
ADD COLUMN IF NOT EXISTS mi_account_lock VARCHAR(50),
ADD COLUMN IF NOT EXISTS hallmark_available VARCHAR(50),
ADD COLUMN IF NOT EXISTS authenticity_guaranteed VARCHAR(50),
ADD COLUMN IF NOT EXISTS purchase_receipt_available VARCHAR(50),
ADD COLUMN IF NOT EXISTS invoice_available VARCHAR(50),
ADD COLUMN IF NOT EXISTS bios_lock VARCHAR(50),
ADD COLUMN IF NOT EXISTS os_activation_status VARCHAR(50),
ADD COLUMN IF NOT EXISTS can_device_be_reset VARCHAR(50);

-- ═══════════════════════════════════════════════════════════════════════════════
-- SECTION 8: REPAIRS & REPLACEMENTS (Hardware parts replaced)
-- ═══════════════════════════════════════════════════════════════════════════════

ALTER TABLE public.form_submissions
ADD COLUMN IF NOT EXISTS authorized_service_repair VARCHAR(50),
ADD COLUMN IF NOT EXISTS previous_repairs TEXT,
ADD COLUMN IF NOT EXISTS back_glass_replaced VARCHAR(50),
ADD COLUMN IF NOT EXISTS screen_replaced VARCHAR(50),
ADD COLUMN IF NOT EXISTS charging_port_replaced VARCHAR(50),
ADD COLUMN IF NOT EXISTS battery_replaced VARCHAR(50),
ADD COLUMN IF NOT EXISTS motherboard_replaced VARCHAR(50),
ADD COLUMN IF NOT EXISTS speaker_replaced VARCHAR(50),
ADD COLUMN IF NOT EXISTS ssd_ram_replaced VARCHAR(50),
ADD COLUMN IF NOT EXISTS ram_ssd_upgraded VARCHAR(50);

-- ═══════════════════════════════════════════════════════════════════════════════
-- SECTION 9: MEASUREMENTS & DIMENSIONS
-- ═══════════════════════════════════════════════════════════════════════════════

ALTER TABLE public.form_submissions
ADD COLUMN IF NOT EXISTS length_cm DECIMAL(10, 2),
ADD COLUMN IF NOT EXISTS breadth_cm DECIMAL(10, 2),
ADD COLUMN IF NOT EXISTS height_cm DECIMAL(10, 2),
ADD COLUMN IF NOT EXISTS width_cm DECIMAL(10, 2),
ADD COLUMN IF NOT EXISTS depth_cm DECIMAL(10, 2),
ADD COLUMN IF NOT EXISTS thickness_mm DECIMAL(10, 2),
ADD COLUMN IF NOT EXISTS size_label VARCHAR(50),
ADD COLUMN IF NOT EXISTS weight_category VARCHAR(50),
ADD COLUMN IF NOT EXISTS measurements_provided BOOLEAN;

-- ═══════════════════════════════════════════════════════════════════════════════
-- SECTION 10: MATERIAL & QUALITY DETAILS
-- ═══════════════════════════════════════════════════════════════════════════════

ALTER TABLE public.form_submissions
ADD COLUMN IF NOT EXISTS material_type VARCHAR(100),
ADD COLUMN IF NOT EXISTS material VARCHAR(100),
ADD COLUMN IF NOT EXISTS purity VARCHAR(50),
ADD COLUMN IF NOT EXISTS gross_weight_grams DECIMAL(10, 2),
ADD COLUMN IF NOT EXISTS net_weight_grams DECIMAL(10, 2),
ADD COLUMN IF NOT EXISTS stone_type VARCHAR(100),
ADD COLUMN IF NOT EXISTS stone_count INT,
ADD COLUMN IF NOT EXISTS carat_weight DECIMAL(10, 2),
ADD COLUMN IF NOT EXISTS clarity VARCHAR(50),
ADD COLUMN IF NOT EXISTS color_grade VARCHAR(50),
ADD COLUMN IF NOT EXISTS fabric_composition VARCHAR(100),
ADD COLUMN IF NOT EXISTS medium VARCHAR(100),
ADD COLUMN IF NOT EXISTS surface VARCHAR(100),
ADD COLUMN IF NOT EXISTS artwork_type VARCHAR(100),
ADD COLUMN IF NOT EXISTS grade_quality VARCHAR(50),
ADD COLUMN IF NOT EXISTS quality VARCHAR(50),
ADD COLUMN IF NOT EXISTS finish_type VARCHAR(100);

-- ═══════════════════════════════════════════════════════════════════════════════
-- SECTION 11: MISCELLANEOUS FIELDS
-- ═══════════════════════════════════════════════════════════════════════════════

ALTER TABLE public.form_submissions
ADD COLUMN IF NOT EXISTS purchase_date DATE,
ADD COLUMN IF NOT EXISTS expected_delivery_date DATE,
ADD COLUMN IF NOT EXISTS device_type VARCHAR(50),
ADD COLUMN IF NOT EXISTS return_policy VARCHAR(100),
ADD COLUMN IF NOT EXISTS storage_details VARCHAR(100),
ADD COLUMN IF NOT EXISTS item_title VARCHAR(255),
ADD COLUMN IF NOT EXISTS laptop_battery_backup VARCHAR(50),
ADD COLUMN IF NOT EXISTS assembly_status VARCHAR(50),
ADD COLUMN IF NOT EXISTS assembly_responsibility VARCHAR(100),
ADD COLUMN IF NOT EXISTS additional_access_notes TEXT,
ADD COLUMN IF NOT EXISTS floor_access_notes TEXT;

-- ═══════════════════════════════════════════════════════════════════════════════
-- SECTION 12: INSPECTION WINDOW (For contract)
-- ═══════════════════════════════════════════════════════════════════════════════

ALTER TABLE public.form_submissions
ADD COLUMN IF NOT EXISTS inspection_window_hours INT;

-- ═══════════════════════════════════════════════════════════════════════════════
-- CREATE INDEXES FOR COMMON QUERIES
-- ═══════════════════════════════════════════════════════════════════════════════

CREATE INDEX IF NOT EXISTS idx_form_submissions_transaction_id ON public.form_submissions(transaction_id);
CREATE INDEX IF NOT EXISTS idx_form_submissions_seller_id ON public.form_submissions(seller_id);
CREATE INDEX IF NOT EXISTS idx_form_submissions_buyer_id ON public.form_submissions(buyer_id);
CREATE INDEX IF NOT EXISTS idx_form_submissions_product_category ON public.form_submissions(product_category);
CREATE INDEX IF NOT EXISTS idx_form_submissions_created_at ON public.form_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_form_submissions_status ON public.form_submissions(form_status);

-- ═══════════════════════════════════════════════════════════════════════════════
-- MIGRATION COMPLETE
-- ═══════════════════════════════════════════════════════════════════════════════

-- This migration adds ~180+ individual columns to store all form field values
-- New code should save form data with individual columns instead of grouped JSONB
-- The field mapping in ContractGenerationEngine.flattenJSONBData() handles both old and new formats
-- 
-- To use these new columns in your code:
-- 1. Update saveFormToDatabase() to insert individual column values
-- 2. Update enrichFormData() to query from individual columns
-- 3. The replacePlaceholders() will work unchanged - it uses field names
