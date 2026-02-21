-- ===============================================================================
-- ADD INDIVIDUAL COLUMNS FOR CONTRACT FIELD POPULATION
-- Simplifies contract generation by storing all contract-needed fields as columns
-- No more complex flattening/grouping - direct column access
-- ===============================================================================

ALTER TABLE form_submissions
ADD COLUMN IF NOT EXISTS scratches_present BOOLEAN,
ADD COLUMN IF NOT EXISTS dents_present BOOLEAN,
ADD COLUMN IF NOT EXISTS battery_health_percent INTEGER,
ADD COLUMN IF NOT EXISTS power_on_working BOOLEAN,
ADD COLUMN IF NOT EXISTS charging_working BOOLEAN,
ADD COLUMN IF NOT EXISTS imei_1 TEXT,
ADD COLUMN IF NOT EXISTS imei_2 TEXT,
ADD COLUMN IF NOT EXISTS serial_number TEXT,
ADD COLUMN IF NOT EXISTS condition_category TEXT,
ADD COLUMN IF NOT EXISTS brand TEXT,
ADD COLUMN IF NOT EXISTS color TEXT,
ADD COLUMN IF NOT EXISTS storage INTEGER,
ADD COLUMN IF NOT EXISTS ram INTEGER,
ADD COLUMN IF NOT EXISTS display_size DECIMAL(4,2),
ADD COLUMN IF NOT EXISTS processor TEXT,
ADD COLUMN IF NOT EXISTS graphics_card TEXT,
ADD COLUMN IF NOT EXISTS battery_capacity INTEGER,
ADD COLUMN IF NOT EXISTS manufactured_year INTEGER,
ADD COLUMN IF NOT EXISTS screen_condition TEXT,
ADD COLUMN IF NOT EXISTS cracks BOOLEAN,
ADD COLUMN IF NOT EXISTS spots_lines BOOLEAN,
ADD COLUMN IF NOT EXISTS touch_issues BOOLEAN,
ADD COLUMN IF NOT EXISTS heating_issues BOOLEAN,
ADD COLUMN IF NOT EXISTS network_issues BOOLEAN,
ADD COLUMN IF NOT EXISTS camera_issues BOOLEAN,
ADD COLUMN IF NOT EXISTS water_marks BOOLEAN,
ADD COLUMN IF NOT EXISTS screen_ok BOOLEAN,
ADD COLUMN IF NOT EXISTS touch_ok BOOLEAN,
ADD COLUMN IF NOT EXISTS buttons_ok BOOLEAN,
ADD COLUMN IF NOT EXISTS speakers_ok BOOLEAN,
ADD COLUMN IF NOT EXISTS camera_ok BOOLEAN,
ADD COLUMN IF NOT EXISTS wifi_bluetooth_ok BOOLEAN,
ADD COLUMN IF NOT EXISTS ports_ok BOOLEAN,
ADD COLUMN IF NOT EXISTS touchscreen BOOLEAN,
ADD COLUMN IF NOT EXISTS buttons BOOLEAN,
ADD COLUMN IF NOT EXISTS wifi_bluetooth BOOLEAN,
ADD COLUMN IF NOT EXISTS fingerprint_faceid BOOLEAN,
ADD COLUMN IF NOT EXISTS speaker_mic_functional BOOLEAN,
ADD COLUMN IF NOT EXISTS front_back_camera BOOLEAN,
ADD COLUMN IF NOT EXISTS sim_detection BOOLEAN,
ADD COLUMN IF NOT EXISTS keyboard_keys BOOLEAN,
ADD COLUMN IF NOT EXISTS trackpad BOOLEAN,
ADD COLUMN IF NOT EXISTS usb_hdmi_ports BOOLEAN,
ADD COLUMN IF NOT EXISTS webcam BOOLEAN,
ADD COLUMN IF NOT EXISTS fast_charging_support BOOLEAN,
ADD COLUMN IF NOT EXISTS box BOOLEAN,
ADD COLUMN IF NOT EXISTS charger BOOLEAN,
ADD COLUMN IF NOT EXISTS cable BOOLEAN,
ADD COLUMN IF NOT EXISTS earphones BOOLEAN,
ADD COLUMN IF NOT EXISTS case_included BOOLEAN,
ADD COLUMN IF NOT EXISTS manual BOOLEAN,
ADD COLUMN IF NOT EXISTS stand_base BOOLEAN,
ADD COLUMN IF NOT EXISTS remote BOOLEAN,
ADD COLUMN IF NOT EXISTS laptop_charger BOOLEAN,
ADD COLUMN IF NOT EXISTS laptop_bag BOOLEAN,
ADD COLUMN IF NOT EXISTS additional_battery BOOLEAN,
ADD COLUMN IF NOT EXISTS tools_included BOOLEAN,
ADD COLUMN IF NOT EXISTS original_packaging BOOLEAN,
ADD COLUMN IF NOT EXISTS warranty_status TEXT,
ADD COLUMN IF NOT EXISTS warranty_valid_till DATE,
ADD COLUMN IF NOT EXISTS rc_status TEXT,
ADD COLUMN IF NOT EXISTS ownership TEXT,
ADD COLUMN IF NOT EXISTS insurance_status TEXT,
ADD COLUMN IF NOT EXISTS puc_valid_till DATE,
ADD COLUMN IF NOT EXISTS icloud_lock_status TEXT,
ADD COLUMN IF NOT EXISTS google_frp_lock BOOLEAN,
ADD COLUMN IF NOT EXISTS mi_account_lock BOOLEAN,
ADD COLUMN IF NOT EXISTS hallmark_available BOOLEAN,
ADD COLUMN IF NOT EXISTS authenticity_guaranteed BOOLEAN,
ADD COLUMN IF NOT EXISTS purchase_receipt_available BOOLEAN;

-- Create an index on commonly queried fields for faster contract generation
CREATE INDEX IF NOT EXISTS idx_form_submissions_contract_fields 
ON form_submissions(transaction_id, scratches_present, dents_present, battery_health_percent, power_on_working, charging_working);

-- ===============================================================================
-- COMMENT: FIELD DESCRIPTION FOR DEVELOPERS
-- ===============================================================================
COMMENT ON COLUMN form_submissions.scratches_present IS 'Boolean: Product has visible scratches';
COMMENT ON COLUMN form_submissions.dents_present IS 'Boolean: Product has dents or physical damage';
COMMENT ON COLUMN form_submissions.battery_health_percent IS 'Integer: Battery health percentage (0-100)';
COMMENT ON COLUMN form_submissions.power_on_working IS 'Boolean: Device powers on successfully';
COMMENT ON COLUMN form_submissions.charging_working IS 'Boolean: Device charges successfully';
COMMENT ON COLUMN form_submissions.imei_1 IS 'Text: First IMEI number for mobile devices';
COMMENT ON COLUMN form_submissions.imei_2 IS 'Text: Second IMEI number for dual-SIM devices';
COMMENT ON COLUMN form_submissions.serial_number IS 'Text: Device serial number';
COMMENT ON COLUMN form_submissions.condition_category IS 'Text: Overall condition (new, like-new, excellent, good, fair, poor)';
