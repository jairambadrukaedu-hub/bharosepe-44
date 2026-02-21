-- Verify cleanup migration results
SELECT COUNT(*) as total_columns
FROM information_schema.columns
WHERE table_name = 'form_submissions';

-- Verify critical columns exist
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'form_submissions'
AND column_name IN (
  'product_name', 'model', 'delivery_method', 'sale_price',
  'condition_category', 'buttons_ok', 'wifi_bluetooth_ok', 'case_included',
  'technical_specs', 'condition_data', 'accessories_data', 'media_files'
)
ORDER BY column_name;

-- Check GIN indexes created
SELECT indexname FROM pg_indexes
WHERE tablename = 'form_submissions'
AND indexname LIKE 'idx_%_jsonb'
ORDER BY indexname;
