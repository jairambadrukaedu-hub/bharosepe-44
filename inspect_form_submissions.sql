-- ═══════════════════════════════════════════════════════════════════════════════
-- ALL COLUMNS IN FORM_SUBMISSIONS TABLE - Simple View
-- ═══════════════════════════════════════════════════════════════════════════════

SELECT 
    ordinal_position AS column_number,
    column_name AS column_name,
    data_type AS data_type,
    is_nullable AS nullable
FROM information_schema.columns 
WHERE table_name = 'form_submissions'
ORDER BY ordinal_position;

