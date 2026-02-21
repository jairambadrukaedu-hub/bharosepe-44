# 🔄 MIGRATION PLAN: From Old Schema to Hybrid Model

**Status:** Ready for Production  
**Date:** November 29, 2025  
**Impact:** Complete database redesign - **BREAKING CHANGE**

---

## ⚠️ IMPORTANT: What Gets Deleted

### Tables Dropped (Old Schema)
```sql
DROP TABLE IF EXISTS form_file_uploads CASCADE;
DROP TABLE IF EXISTS form_submissions_backup CASCADE;
DROP TABLE IF EXISTS form_submissions_archive CASCADE;
DROP TABLE IF EXISTS form_submissions CASCADE;  -- ⚠️ MAIN TABLE
```

### Views Dropped
```sql
DROP VIEW IF EXISTS form_submissions_for_contract CASCADE;
DROP VIEW IF EXISTS electronics_mobile_contract_data CASCADE;
DROP VIEW IF EXISTS vehicles_contract_data CASCADE;
DROP VIEW IF EXISTS jewellery_contract_data CASCADE;
DROP VIEW IF EXISTS services_contract_data CASCADE;
```

### Functions Dropped
```sql
DROP FUNCTION IF EXISTS update_form_submissions_updated_at() CASCADE;
DROP FUNCTION IF EXISTS get_contract_data(TEXT) CASCADE;
DROP FUNCTION IF EXISTS get_category_fields(TEXT) CASCADE;
```

### Triggers Dropped
```sql
DROP TRIGGER IF EXISTS trigger_form_submissions_updated_at ON form_submissions CASCADE;
```

---

## 📋 BEFORE YOU MIGRATE

### ⚠️ BACKUP CHECKLIST
- [ ] **Export all existing form data** (if any)
  ```sql
  -- Run this BEFORE migration to backup data
  SELECT * FROM form_submissions 
  INTO OUTFILE '/tmp/form_submissions_backup.csv' 
  WITH CSV HEADER;
  ```

- [ ] **Export any form_file_uploads data**
  ```sql
  SELECT * FROM form_file_uploads 
  INTO OUTFILE '/tmp/form_file_uploads_backup.csv' 
  WITH CSV HEADER;
  ```

- [ ] **Save Supabase snapshot** (via Supabase dashboard)
  - Go to: Database > Backups > Create backup now

- [ ] **Verify no active sessions** on database
  ```sql
  SELECT * FROM pg_stat_activity WHERE datname = 'postgres';
  ```

---

## 🔄 MIGRATION STEPS

### Step 1: Backup Current Database
```bash
# Via Supabase CLI
supabase db pull  # Pull current schema
supabase db dump > backup_20251129.sql  # Export all data
```

### Step 2: Apply Migration
```bash
# Via Supabase Dashboard
# - Go to SQL Editor
# - Paste migration file: 20251129_create_form_submissions_hybrid_model.sql
# - Click "Run"

# OR via CLI
supabase migration up
```

### Step 3: Verify Migration
```sql
-- Check table exists
SELECT table_name FROM information_schema.tables 
WHERE table_name = 'form_submissions';

-- Check columns count
SELECT COUNT(*) as column_count FROM information_schema.columns 
WHERE table_name = 'form_submissions';
-- Expected: 200+ columns

-- Check indexes
SELECT COUNT(*) as index_count FROM pg_indexes 
WHERE tablename = 'form_submissions';
-- Expected: 15+ indexes

-- Check views
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' AND table_type = 'VIEW' 
AND table_name LIKE 'form%';
-- Expected: 5 views
```

### Step 4: Restore Data (If Migrating Existing Data)
```sql
-- This is for reference ONLY if you have existing form data
-- You'll need to map old columns to new hybrid model

-- Example: Restore electronics data
INSERT INTO form_submissions (
  user_id, transaction_id, industry_category, annexure_code,
  seller_id, product_name, brand, description, sale_price, condition,
  expected_delivery_date, delivery_mode, return_policy, inspection_window_hours,
  storage, ram, processor, display_size, battery_health_percent,
  form_status, completion_percentage
) SELECT
  user_id, transaction_id, 'electronics', 'A',
  seller_id, product_name, brand, description, sale_price, condition,
  expected_delivery_date, delivery_mode, return_policy, inspection_window_hours,
  storage, ram, processor, display_size, battery_health_percent,
  form_status, completion_percentage
FROM form_submissions_backup
WHERE industry_category = 'electronics';
```

---

## 📊 SCHEMA COMPARISON

### Old Schema Problems ❌
- Multiple tables with duplicated data
- Too many columns (256+) all in direct columns
- No flexibility for optional fields
- Difficult to query industry-specific data
- Migration pain for adding new fields
- No JSONB for complex data

### New Hybrid Model Benefits ✅

| Aspect | Old | New |
|--------|-----|-----|
| **Main Table** | form_submissions | form_submissions |
| **Supporting Tables** | form_file_uploads, form_submissions_backup, form_submissions_archive | None (all in main table + JSONB) |
| **Direct Columns** | 256+ | 200 (focused on searchable fields) |
| **JSONB Columns** | 0 | 16 (flexible storage) |
| **Total Storage** | Very wide, many NULLs | Efficient, compact |
| **Query Speed** | Medium (many columns) | Fast (indexed columns + JSONB GIN) |
| **Schema Flexibility** | Rigid (migration needed) | Flexible (add to JSONB anytime) |
| **Contract Generation** | Scattered data | Optimized views ready |
| **Indexes** | 8-10 | 15+ strategic indexes |
| **Industry Support** | Limited | All 32 (1,088+ fields) |

---

## 🎯 NEW SCHEMA STRUCTURE

### Mandatory Identifiers (5 columns)
```
id, user_id, transaction_id, industry_category, annexure_code
```

### Universal Required (15 columns)
```
product_name, brand, description, sale_price, condition, color,
expected_delivery_date, delivery_mode, return_policy, inspection_window_hours,
seller_id, buyer_id, form_status, completion_percentage, created_at
```

### Category-Specific Direct (180+ columns)
```
-- Electronics: storage, ram, processor, display_size, battery_capacity
-- Vehicles: registration_number, engine_number, fuel_type, odometer_reading
-- Fashion: material_type, wear_level, size_label, zipper_working
-- Jewelry: metal_type, purity, gross_weight_grams, stone_type, hallmark_available
-- ... and many more per industry
```

### JSONB Flexible (16 columns)
```
technical_specs, condition_data, functionality_data, measurements,
material_data, accessories_data, warranty_legal_data, documentation_data,
usage_history_data, media_files, buyer_requirements, category_specific_data,
delivery_data, uploaded_photos, uploaded_images, custom_fields
```

---

## ✅ POST-MIGRATION CHECKLIST

### Verification
- [ ] Table `form_submissions` exists
- [ ] Column count: 200+
- [ ] Index count: 15+
- [ ] View count: 5
- [ ] No errors in migration log

### Data Validation
- [ ] No data loss (if restoring)
- [ ] Foreign keys working
- [ ] Constraints enforced
- [ ] Triggers active

### Permissions
- [ ] Authenticated users can INSERT
- [ ] Authenticated users can SELECT
- [ ] Authenticated users can UPDATE
- [ ] Views accessible

### Testing
- [ ] INSERT test record (electronics)
- [ ] INSERT test record (vehicles)
- [ ] INSERT test record (services)
- [ ] Query contract view works
- [ ] JSONB fields store/retrieve data

---

## 🧪 TEST QUERIES (After Migration)

### Test 1: Verify Table
```sql
SELECT table_name, column_count 
FROM information_schema.tables 
WHERE table_name = 'form_submissions';
```

### Test 2: Verify Indexes
```sql
SELECT indexname, indexdef 
FROM pg_indexes 
WHERE tablename = 'form_submissions' 
ORDER BY indexname;
```

### Test 3: Verify Views
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_type = 'VIEW' 
  AND table_name LIKE 'form%';
```

### Test 4: Insert Test Electronics Record
```sql
INSERT INTO form_submissions (
  user_id, transaction_id, industry_category, annexure_code,
  seller_id, product_name, brand, description, sale_price, condition,
  expected_delivery_date, delivery_mode, return_policy, inspection_window_hours,
  storage, ram, processor, display_size, battery_health_percent,
  form_status, completion_percentage, technical_specs, accessories_data
) VALUES (
  'test-user-uuid'::uuid,
  'TEST-TXN-001',
  'electronics',
  'A',
  'test-seller-uuid'::uuid,
  'Test iPhone 15',
  'Apple',
  'Test device for migration verification',
  999.99,
  'excellent',
  NOW()::DATE + 5,
  'Courier',
  '7 days',
  48,
  256,
  8,
  'A17 Pro',
  6.7,
  98,
  'completed',
  100,
  '{"processor": "A17 Pro", "os": "iOS 18"}'::JSONB,
  '{"box": true, "charger": true}'::JSONB
);

-- Verify insert
SELECT * FROM form_submissions WHERE transaction_id = 'TEST-TXN-001';
```

### Test 5: Query Contract View
```sql
SELECT * FROM form_submissions_for_contract 
WHERE transaction_id = 'TEST-TXN-001';
```

### Test 6: Test JSONB Queries
```sql
-- Query JSONB data
SELECT * FROM form_submissions 
WHERE technical_specs->>'processor' = 'A17 Pro';

-- Query JSONB array
SELECT * FROM form_submissions 
WHERE uploaded_photos @> '[]'::jsonb;
```

---

## 🚨 ROLLBACK PLAN (If Something Goes Wrong)

### Immediate Rollback
```bash
# If migration fails, Supabase will NOT commit
# Check the error message and fix migration file

# Restore from backup
supabase db push --backup-only
```

### Manual Rollback
```sql
-- If you need to manually restore from backup:
DROP TABLE IF EXISTS form_submissions CASCADE;

-- Restore from backup dump
\i /path/to/backup_20251129.sql
```

---

## 📈 PERFORMANCE EXPECTATIONS

### Query Speed After Migration

| Query Type | Time | Notes |
|------------|------|-------|
| Find by transaction_id | < 5ms | Direct indexed lookup |
| Find by user_id | < 10ms | User index on all submissions |
| Search by brand | < 20ms | Indexed direct column |
| Filter by condition | < 15ms | Indexed direct column |
| Complex filter (multi-condition) | < 50ms | Multiple indexes used |
| JSONB search (with GIN index) | < 50ms | Fast JSON query |
| Contract generation (fetch all data) | < 100ms | View optimized for contract |

---

## ✨ NEXT STEPS AFTER MIGRATION

1. **Update Application Code**
   - Update form submission queries to use new column names
   - Update contract generation to use new views
   - Test all form submissions

2. **Data Pipeline**
   - Test ETL processes with new schema
   - Verify data transformations work
   - Validate contract generation

3. **Monitoring**
   - Set up performance monitoring
   - Track slow queries
   - Monitor storage usage

4. **Documentation**
   - Update API documentation
   - Document new JSONB column usage
   - Create data dictionary

---

## 📞 TROUBLESHOOTING

### Issue: Migration Takes Too Long
- **Cause:** Large existing table (if data exists)
- **Solution:** Run during off-peak hours, ensure no active connections

### Issue: Foreign Key Constraint Error
- **Cause:** References from other tables
- **Solution:** CASCADE drops handle this, verify related tables

### Issue: Permission Denied
- **Cause:** User doesn't have ALTER TABLE rights
- **Solution:** Use Supabase admin credentials, check role permissions

### Issue: Indexes Not Created
- **Cause:** Disk space or memory issue
- **Solution:** Check Supabase resource usage, try restarting if needed

---

## 🎓 LEARNING RESOURCES

- [PostgreSQL Hybrid Model Patterns](https://www.postgresql.org/docs/current/datatype-json.html)
- [JSONB Best Practices](https://www.postgresql.org/docs/current/datatype-json.html#id1.5.7.14.13)
- [Index Strategy Guide](https://www.postgresql.org/docs/current/indexes.html)
- [Supabase Migration Docs](https://supabase.com/docs/guides/database/migrations)

---

**Status:** ✅ Ready for Production Deployment

