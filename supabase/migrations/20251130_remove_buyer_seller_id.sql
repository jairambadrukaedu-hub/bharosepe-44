-- ===============================================================================
-- MIGRATION: REMOVE buyer_id AND seller_id FROM form_submissions
-- Date: November 30, 2025
-- Version: 1.0
-- ===============================================================================
--
-- OVERVIEW:
-- Remove buyer_id and seller_id columns from form_submissions table
-- since user_id is already present and sufficient for tracking the form creator.
-- These columns are redundant and can be replaced with user_id.
-- All dependent views are recreated to use user_id instead.
--
-- ===============================================================================
-- PHASE 1: DROP DEPENDENT VIEWS WITH CASCADE
-- ===============================================================================

-- Drop all views that reference seller_id and buyer_id using CASCADE
DROP VIEW IF EXISTS form_submissions_for_contract CASCADE;
DROP VIEW IF EXISTS electronics_mobile_contract_data CASCADE;
DROP VIEW IF EXISTS vehicles_contract_data CASCADE;
DROP VIEW IF EXISTS jewellery_contract_data CASCADE;
DROP VIEW IF EXISTS services_contract_data CASCADE;

-- ===============================================================================
-- PHASE 2: DROP INDEXES
-- ===============================================================================

-- Drop indexes that depend on seller_id and buyer_id
DROP INDEX IF EXISTS idx_form_submissions_seller_id;
DROP INDEX IF EXISTS idx_form_submissions_buyer_id;

-- ===============================================================================
-- PHASE 3: DROP COLUMNS WITH CASCADE
-- ===============================================================================

-- Remove buyer_id and seller_id columns from form_submissions using CASCADE
ALTER TABLE form_submissions
  DROP COLUMN IF EXISTS seller_id CASCADE,
  DROP COLUMN IF EXISTS buyer_id CASCADE;

-- ===============================================================================
-- PHASE 4: RECREATE VIEWS WITH user_id DEPENDENCY
-- ===============================================================================

-- View: Main contract data (now uses user_id instead of seller_id/buyer_id)
CREATE VIEW form_submissions_for_contract AS
SELECT
  id,
  form_id,
  user_id,
  industry_category,
  annexure_code,
  -- Universal contract fields
  product_name,
  brand,
  description,
  sale_price,
  condition,
  color,
  expected_delivery_date,
  delivery_mode,
  return_policy,
  inspection_window_hours,
  -- Category-specific crucial fields
  COALESCE(processor, '') as technical_detail,
  COALESCE(registration_number, metal_type, artist) as identifier,
  COALESCE(storage::text, '') as spec1,
  COALESCE(ram::text, '') as spec2,
  -- Status
  form_status,
  completion_percentage,
  created_at,
  submitted_at,
  -- JSONB data
  technical_specs,
  condition_data,
  accessories_data,
  warranty_legal_data,
  documentation_data,
  uploaded_photos,
  uploaded_images
FROM form_submissions
WHERE form_status IN ('completed', 'submitted');

-- View: Electronics/Mobile for contract
CREATE VIEW electronics_mobile_contract_data AS
SELECT
  id, form_id, user_id,
  product_name, brand, description, sale_price,
  storage, ram, display_size, processor, battery_health_percent,
  condition, expected_delivery_date, delivery_mode, return_policy,
  technical_specs, condition_data, accessories_data, warranty_legal_data,
  uploaded_photos
FROM form_submissions
WHERE industry_category IN ('electronics', 'mobile')
  AND form_status IN ('completed', 'submitted');

-- View: Vehicles for contract
CREATE VIEW vehicles_contract_data AS
SELECT
  id, form_id, user_id,
  product_name, make, model, registration_number, chassis_number,
  engine_number, fuel_type, manufactured_year, odometer_reading,
  condition, sale_price, expected_delivery_date, delivery_mode,
  insurance_status, rc_status, puc_valid_till,
  technical_specs, condition_data, documentation_data, warranty_legal_data,
  uploaded_photos
FROM form_submissions
WHERE industry_category = 'vehicles'
  AND form_status IN ('completed', 'submitted');

-- View: Jewellery for contract
CREATE VIEW jewellery_contract_data AS
SELECT
  id, form_id, user_id,
  product_name, brand, jewellery_category, metal_type, purity,
  gross_weight_grams, stone_type, carat_weight, clarity,
  hallmark_available, authenticity_guaranteed, certificate_available,
  condition, sale_price, expected_delivery_date, delivery_mode,
  technical_specs, condition_data, warranty_legal_data, documentation_data,
  uploaded_photos
FROM form_submissions
WHERE industry_category = 'jewellery'
  AND form_status IN ('completed', 'submitted');

-- View: Services for contract
CREATE VIEW services_contract_data AS
SELECT
  id, form_id, user_id,
  product_name, service_type, description, scope_description,
  sale_price, expected_delivery_date, inspection_window_hours,
  team_size, project_duration_days, support_duration_months,
  documentation_included, testing_scope,
  condition, delivery_mode, return_policy,
  technical_specs, warranty_legal_data, documentation_data,
  uploaded_photos
FROM form_submissions
WHERE industry_category IN (
  'software_development', 'ui_ux_design', 'content_writing',
  'photography_video', 'coaching_training', 'home_repair',
  'cleaning_housekeeping', 'digital_marketing', 'consulting', 'event_management'
)
  AND form_status IN ('completed', 'submitted');

COMMIT;
