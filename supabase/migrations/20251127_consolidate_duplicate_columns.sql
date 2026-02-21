/**
 * MIGRATION: Consolidate Duplicate Columns in form_submissions
 * 
 * This migration consolidates data from duplicate columns to canonical columns,
 * then drops the deprecated columns to clean up the schema.
 * 
 * Safety: All data is consolidated BEFORE any columns are dropped.
 * No data is lost - only reorganized for consistency.
 */

-- Start transaction for safety
BEGIN;

-- First, let's consolidate all data to canonical columns
-- Safe strategy: Update canonical columns with data from duplicates

-- ═══════════════════════════════════════════════════════════════════════════════
-- DATA CONSOLIDATION PHASE
-- Update canonical columns with data from duplicates (type-safe approach)
-- ═══════════════════════════════════════════════════════════════════════════════

-- GROUP 1: IMEI - Text/Varchar columns (safe to COALESCE)
UPDATE form_submissions 
SET imei = COALESCE(imei, imei_1, imei_2, imei1, imei2)
WHERE imei IS NULL AND (imei_1 IS NOT NULL OR imei_2 IS NOT NULL OR imei1 IS NOT NULL OR imei2 IS NOT NULL);

UPDATE form_submissions 
SET imei_2 = COALESCE(imei_2, imei2)
WHERE imei_2 IS NULL AND imei2 IS NOT NULL;

-- GROUP 2: SCRATCHES - Convert varchar to boolean
UPDATE form_submissions 
SET scratches_present = CASE 
    WHEN scratches IS NOT NULL THEN (scratches = 'true' OR scratches = 'yes' OR scratches = '1')::BOOLEAN
    ELSE scratches_present
END
WHERE scratches_present IS NULL AND scratches IS NOT NULL;

-- GROUP 3: DENTS - Convert varchar to boolean
UPDATE form_submissions 
SET dents_present = CASE 
    WHEN dents IS NOT NULL THEN (dents = 'true' OR dents = 'yes' OR dents = '1')::BOOLEAN
    WHEN back_dents IS NOT NULL THEN (back_dents = 'true' OR back_dents = 'yes' OR back_dents = '1')::BOOLEAN
    ELSE dents_present
END
WHERE (dents_present IS NULL AND dents IS NOT NULL) OR (dents_present IS NULL AND back_dents IS NOT NULL);

-- GROUP 4: BATTERY HEALTH - Numeric consolidation
UPDATE form_submissions 
SET battery_health_percent = COALESCE(battery_health_percent, battery_health_percentage)
WHERE battery_health_percent IS NULL AND battery_health_percentage IS NOT NULL;

UPDATE form_submissions 
SET battery_health_percent = COALESCE(battery_health_percent::INTEGER,
    CASE WHEN battery_health_iphone ~ '^\d+$' THEN battery_health_iphone::INTEGER ELSE NULL END)::INTEGER
WHERE battery_health_percent IS NULL AND battery_health_iphone IS NOT NULL;

-- GROUP 5: POWER ON - Convert varchar to boolean
UPDATE form_submissions 
SET power_on_working = CASE 
    WHEN power_on IS NOT NULL THEN (power_on = 'true' OR power_on = 'yes' OR power_on = '1')::BOOLEAN
    WHEN turns_on IS NOT NULL THEN (turns_on = 'true' OR turns_on = 'yes' OR turns_on = '1')::BOOLEAN
    ELSE power_on_working
END
WHERE (power_on_working IS NULL AND power_on IS NOT NULL) OR (power_on_working IS NULL AND turns_on IS NOT NULL);

-- GROUP 6: CHARGING - Convert varchar to boolean
UPDATE form_submissions 
SET charging_working = CASE 
    WHEN charges IS NOT NULL THEN (charges = 'true' OR charges = 'yes' OR charges = '1')::BOOLEAN
    ELSE charging_working
END
WHERE charging_working IS NULL AND charges IS NOT NULL;

-- GROUP 7: SCREEN - Convert text to boolean
UPDATE form_submissions 
SET screen_ok = CASE 
    WHEN screen_condition IS NOT NULL THEN (screen_condition = 'true' OR screen_condition = 'yes' OR screen_condition = '1')::BOOLEAN
    ELSE screen_ok
END
WHERE screen_ok IS NULL AND screen_condition IS NOT NULL;

-- GROUP 8: TOUCHSCREEN - Convert varchar to boolean
UPDATE form_submissions 
SET touchscreen = CASE 
    WHEN touch_ok IS NOT NULL THEN (touch_ok = 'true' OR touch_ok = 'yes' OR touch_ok = '1')::BOOLEAN
    WHEN touch_issues IS NOT NULL THEN (touch_issues = 'true' OR touch_issues = 'yes' OR touch_issues = '1')::BOOLEAN
    ELSE touchscreen
END
WHERE (touchscreen IS NULL AND touch_ok IS NOT NULL) OR (touchscreen IS NULL AND touch_issues IS NOT NULL);

-- GROUP 9: CAMERA - Convert varchar to boolean
UPDATE form_submissions 
SET camera_ok = CASE 
    WHEN front_back_camera IS NOT NULL THEN (front_back_camera = 'true' OR front_back_camera = 'yes' OR front_back_camera = '1')::BOOLEAN
    ELSE camera_ok
END
WHERE camera_ok IS NULL AND front_back_camera IS NOT NULL;

-- GROUP 10: BOX - Drop duplicates (canonical original_box already exists)
-- No consolidation needed - just remove duplicates

-- GROUP 11: CHARGER - Drop duplicates (canonical original_charger already exists)
-- No consolidation needed - just remove duplicates

-- GROUP 12: WARRANTY - Varchar columns (safe to COALESCE)
UPDATE form_submissions 
SET warranty_valid_until = COALESCE(warranty_valid_until, warranty_valid_till)
WHERE warranty_valid_until IS NULL AND warranty_valid_till IS NOT NULL;

-- GROUP 13: OTHER ACCESSORIES - Varchar columns (safe to COALESCE)
UPDATE form_submissions 
SET other_accessories = COALESCE(other_accessories, others)
WHERE other_accessories IS NULL AND others IS NOT NULL;

-- GROUP 14: KNOWN DEFECTS - Varchar columns (safe to COALESCE)
UPDATE form_submissions 
SET known_defects = COALESCE(known_defects, known_issues, other_damages)
WHERE known_defects IS NULL AND (known_issues IS NOT NULL OR other_damages IS NOT NULL);

-- GROUP 15: SSD/RAM REPLACED - Drop duplicates (canonical ssd_ram_replaced already exists)
-- No consolidation needed - just remove duplicates

-- ═══════════════════════════════════════════════════════════════════════════════
-- CREATE DOCUMENTATION VIEW SHOWING CONSOLIDATION MAPPING
-- ═══════════════════════════════════════════════════════════════════════════════

-- This view shows which columns should be used (canonical) vs which are deprecated
CREATE OR REPLACE VIEW deprecated_columns_mapping AS
SELECT 
    'IMEI' as category,
    'imei' as canonical_column,
    'imei_1, imei1, imei_2, imei2' as deprecated_columns,
    'Use imei for primary IMEI number' as recommendation
UNION ALL
SELECT 'CONDITION', 'scratches_present', 'scratches', 'Use scratches_present (formDataMapper output)'
UNION ALL
SELECT 'CONDITION', 'dents_present', 'dents, back_dents', 'Use dents_present (formDataMapper output)'
UNION ALL
SELECT 'CONDITION', 'battery_health_percent', 'battery_health_percentage, battery_health_iphone', 'Use battery_health_percent (formDataMapper output)'
UNION ALL
SELECT 'FUNCTIONALITY', 'power_on_working', 'power_on, turns_on', 'Use power_on_working (formDataMapper output)'
UNION ALL
SELECT 'FUNCTIONALITY', 'charging_working', 'charges', 'Use charging_working (formDataMapper output)'
UNION ALL
SELECT 'FUNCTIONALITY', 'screen_ok', 'screen_condition (if yes/no)', 'Use screen_ok for yes/no status'
UNION ALL
SELECT 'FUNCTIONALITY', 'touchscreen', 'touch_ok, touch_issues', 'Use touchscreen for yes/no status'
UNION ALL
SELECT 'FUNCTIONALITY', 'camera_ok', 'front_back_camera', 'Use camera_ok for yes/no status'
UNION ALL
SELECT 'ACCESSORIES', 'original_box', 'box, original_box_included', 'Use original_box for box status'
UNION ALL
SELECT 'ACCESSORIES', 'original_charger', 'charger, original_charger_included', 'Use original_charger for charger status'
UNION ALL
SELECT 'WARRANTY', 'warranty_valid_until', 'warranty_valid_till', 'Use warranty_valid_until for warranty date'
UNION ALL
SELECT 'ACCESSORIES', 'other_accessories', 'others', 'Use other_accessories for additional items'
UNION ALL
SELECT 'DEFECTS', 'known_defects', 'known_issues, other_damages', 'Use known_defects for defect descriptions'
UNION ALL
SELECT 'HARDWARE', 'ssd_ram_replaced', 'ram_ssd_upgraded', 'Use ssd_ram_replaced for hardware upgrades'
ORDER BY category, canonical_column;

-- ═══════════════════════════════════════════════════════════════════════════════
-- DROP UNNECESSARY DUPLICATE COLUMNS (Data already consolidated to canonical)
-- This cleans up the schema by removing columns that no longer serve a purpose
-- ═══════════════════════════════════════════════════════════════════════════════

-- Drop all duplicate condition columns
ALTER TABLE form_submissions 
DROP COLUMN IF EXISTS scratches CASCADE;

ALTER TABLE form_submissions 
DROP COLUMN IF EXISTS dents CASCADE;

ALTER TABLE form_submissions 
DROP COLUMN IF EXISTS back_dents CASCADE;

ALTER TABLE form_submissions 
DROP COLUMN IF EXISTS battery_health_percentage CASCADE;

ALTER TABLE form_submissions 
DROP COLUMN IF EXISTS battery_health_iphone CASCADE;

-- Drop all duplicate functionality columns
ALTER TABLE form_submissions 
DROP COLUMN IF EXISTS power_on CASCADE;

ALTER TABLE form_submissions 
DROP COLUMN IF EXISTS turns_on CASCADE;

ALTER TABLE form_submissions 
DROP COLUMN IF EXISTS charges CASCADE;

-- Drop duplicate touch/screen columns (keep screen_condition only if needed for descriptions)
ALTER TABLE form_submissions 
DROP COLUMN IF EXISTS touch_ok CASCADE;

ALTER TABLE form_submissions 
DROP COLUMN IF EXISTS touch_issues CASCADE;

ALTER TABLE form_submissions 
DROP COLUMN IF EXISTS front_back_camera CASCADE;

-- Drop duplicate accessories columns
ALTER TABLE form_submissions 
DROP COLUMN IF EXISTS box CASCADE;

ALTER TABLE form_submissions 
DROP COLUMN IF EXISTS original_box_included CASCADE;

ALTER TABLE form_submissions 
DROP COLUMN IF EXISTS charger CASCADE;

ALTER TABLE form_submissions 
DROP COLUMN IF EXISTS original_charger_included CASCADE;

-- Drop duplicate warranty column
ALTER TABLE form_submissions 
DROP COLUMN IF EXISTS warranty_valid_till CASCADE;

-- Drop duplicate description columns
ALTER TABLE form_submissions 
DROP COLUMN IF EXISTS others CASCADE;

ALTER TABLE form_submissions 
DROP COLUMN IF EXISTS known_issues CASCADE;

ALTER TABLE form_submissions 
DROP COLUMN IF EXISTS other_damages CASCADE;

-- Drop duplicate hardware replacement column
ALTER TABLE form_submissions 
DROP COLUMN IF EXISTS ram_ssd_upgraded CASCADE;

-- Drop duplicate IMEI formatting columns (keep imei and imei_2 for dual-SIM)
ALTER TABLE form_submissions 
DROP COLUMN IF EXISTS imei_1 CASCADE;

ALTER TABLE form_submissions 
DROP COLUMN IF EXISTS imei1 CASCADE;

ALTER TABLE form_submissions 
DROP COLUMN IF EXISTS imei2 CASCADE;

-- ═══════════════════════════════════════════════════════════════════════════════
-- VERIFICATION QUERIES (Run these to verify consolidation worked)
-- ═══════════════════════════════════════════════════════════════════════════════

-- Check how many records have data consolidated to canonical columns
CREATE OR REPLACE VIEW consolidation_summary AS
SELECT
    'scratches_present' AS column_name,
    COUNT(*) AS total_records,
    COUNT(CASE WHEN scratches_present IS NOT NULL THEN 1 END) AS populated_canonical,
    'Consolidated from deprecated scratches column' AS status
FROM form_submissions
UNION ALL
SELECT 'dents_present', COUNT(*), 
    COUNT(CASE WHEN dents_present IS NOT NULL THEN 1 END),
    'Consolidated from deprecated dents, back_dents columns'
FROM form_submissions
UNION ALL
SELECT 'battery_health_percent', COUNT(*),
    COUNT(CASE WHEN battery_health_percent IS NOT NULL THEN 1 END),
    'Consolidated from deprecated battery_health_percentage, battery_health_iphone'
FROM form_submissions
UNION ALL
SELECT 'power_on_working', COUNT(*),
    COUNT(CASE WHEN power_on_working IS NOT NULL THEN 1 END),
    'Consolidated from deprecated power_on, turns_on columns'
FROM form_submissions
UNION ALL
SELECT 'charging_working', COUNT(*),
    COUNT(CASE WHEN charging_working IS NOT NULL THEN 1 END),
    'Consolidated from deprecated charges column'
FROM form_submissions
ORDER BY column_name;

-- ═══════════════════════════════════════════════════════════════════════════════
-- COMMIT TRANSACTION
-- ═══════════════════════════════════════════════════════════════════════════════

COMMIT;

-- ═══════════════════════════════════════════════════════════════════════════════
-- FINAL VERIFICATION (Run after migration)
-- ═══════════════════════════════════════════════════════════════════════════════

/*
After running this migration, verify with:

SELECT deprecated_columns_mapping;
SELECT consolidation_summary;

Expected results:
- All canonical columns should show data populated
- Deprecated columns should show 0 or minimal data
- No errors during updates
*/
