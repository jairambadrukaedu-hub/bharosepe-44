# ✅ QUICK MIGRATION CHECKLIST

**Migration File:** `20251129_create_form_submissions_hybrid_model.sql`  
**Date:** November 29, 2025  
**Status:** Ready to Deploy

---

## 🔴 BEFORE MIGRATION

### Data Backup (CRITICAL)
- [ ] Export current form_submissions data
- [ ] Export form_file_uploads data
- [ ] Create Supabase database snapshot
- [ ] Verify backups are accessible
- [ ] Store backup location: ________________

### Environment Checks
- [ ] No active application sessions
- [ ] Scheduled maintenance window confirmed
- [ ] Communication sent to users (if needed)
- [ ] Backup database connection verified
- [ ] Have rollback plan ready

---

## 🟡 DURING MIGRATION

### Pre-Execution (5 minutes before)
- [ ] Stop application server(s)
- [ ] Verify no database connections
  ```sql
  SELECT * FROM pg_stat_activity WHERE datname = 'postgres';
  ```
- [ ] Take final backup screenshot
- [ ] Note exact start time: ________________

### Execution
- [ ] Copy migration file content
- [ ] Open Supabase SQL Editor
- [ ] Paste migration file
- [ ] **Double-check migration file** ✅
- [ ] Click "Run" 
- [ ] Monitor execution (should take < 30 seconds)
- [ ] Note exact completion time: ________________

### Post-Execution Verification (5 minutes after)
```sql
-- Run these immediately after
SELECT COUNT(*) as tables_remaining 
FROM information_schema.tables 
WHERE table_name LIKE 'form_%' AND table_schema = 'public';
-- Expected: 1 (only form_submissions)

SELECT COUNT(*) as column_count 
FROM information_schema.columns 
WHERE table_name = 'form_submissions';
-- Expected: 200+

SELECT COUNT(*) as index_count 
FROM pg_indexes WHERE tablename = 'form_submissions';
-- Expected: 15+

SELECT COUNT(*) as view_count 
FROM information_schema.tables 
WHERE table_type = 'VIEW' AND table_name LIKE 'form%';
-- Expected: 5
```

---

## 🟢 AFTER MIGRATION

### Immediate Actions (First 5 minutes)
- [ ] Run verification queries (above)
- [ ] Document results in: ________________
- [ ] All checks passed? YES / NO
- [ ] If NO, proceed to rollback section

### Application Restart (First 15 minutes)
- [ ] Restart API server
- [ ] Restart background jobs (if any)
- [ ] Verify application health checks pass
- [ ] Monitor error logs for issues
- [ ] Check database connection pool

### Data Integrity Tests (First 30 minutes)
- [ ] Test INSERT (electronics form)
- [ ] Test INSERT (vehicles form)
- [ ] Test INSERT (services form)
- [ ] Test SELECT from contract views
- [ ] Test JSONB field updates
- [ ] Verify no data loss (if migrating existing data)

### User Testing (First 60 minutes)
- [ ] Form submission works
- [ ] Data saves correctly
- [ ] Contract generation fetches data
- [ ] No performance degradation
- [ ] Error messages clear
- [ ] Monitors show healthy metrics

### Full Verification (After 2 hours)
- [ ] All forms functional
- [ ] No database errors in logs
- [ ] Query performance acceptable
- [ ] File uploads working (if applicable)
- [ ] Backup/restore procedures work

---

## 🔴 IF SOMETHING GOES WRONG

### Rollback Immediate (First 5 minutes)

**Option 1: Via Supabase Backups**
- Go to Supabase Dashboard
- Select "Backups"
- Click "Restore" on latest backup
- Confirm restoration

**Option 2: Via SQL**
```sql
-- Only if you have previous backup dump
\i /path/to/backup_20251129.sql
```

### Investigate Issues (After Rollback)
- [ ] Check error log details
- [ ] Document error message: ________________
- [ ] Fix migration file if needed
- [ ] Schedule retry for next maintenance window

### Communication
- [ ] Notify team of rollback
- [ ] Post mortem: Identify root cause
- [ ] Plan fix and retest
- [ ] Update migration plan

---

## 📋 WHAT GETS DELETED

### ⚠️ These will be DROPPED:
```
Tables:
  ❌ form_submissions (old version)
  ❌ form_file_uploads
  ❌ form_submissions_backup
  ❌ form_submissions_archive

Views:
  ❌ form_submissions_for_contract
  ❌ electronics_mobile_contract_data
  ❌ vehicles_contract_data
  ❌ jewellery_contract_data
  ❌ services_contract_data

Functions:
  ❌ update_form_submissions_updated_at()
  ❌ get_contract_data()
  ❌ get_category_fields()

Triggers:
  ❌ trigger_form_submissions_updated_at
```

---

## 📊 WHAT GETS CREATED

### ✅ These will be CREATED:
```
Tables:
  ✅ form_submissions (new hybrid model)
    - 200+ direct columns
    - 16 JSONB columns
    - Complete industry support (32 types)

Indexes:
  ✅ 15+ strategic indexes
    - Mandatory field indexes
    - Status indexes
    - Direct column indexes
    - JSONB GIN indexes

Views:
  ✅ form_submissions_for_contract
  ✅ electronics_mobile_contract_data
  ✅ vehicles_contract_data
  ✅ jewellery_contract_data
  ✅ services_contract_data

Functions:
  ✅ get_contract_data(TEXT)
  ✅ get_category_fields(TEXT)
  ✅ update_form_submissions_updated_at()

Triggers:
  ✅ trigger_form_submissions_updated_at
```

---

## 🎯 SUCCESS CRITERIA

### Migration is SUCCESS when:
- [ ] All old tables deleted successfully
- [ ] New form_submissions table created with 200+ columns
- [ ] All 15+ indexes created successfully
- [ ] All 5 views created successfully
- [ ] All 2 helper functions created successfully
- [ ] Trigger active and working
- [ ] Test records insert successfully
- [ ] Contract views return data correctly
- [ ] No application errors
- [ ] Query performance acceptable

### If ANY of above fails:
- [ ] Proceed to ROLLBACK
- [ ] Investigate error logs
- [ ] Fix and retry

---

## 📞 SUPPORT

### If Issues Arise:

**Error: "Table already exists"**
- Solution: Migration has CASCADE DROP, shouldn't happen
- Fallback: Run DROP TABLE IF EXISTS manually

**Error: "Permission denied"**
- Solution: Verify Supabase admin credentials
- Fallback: Use Supabase dashboard UI instead of CLI

**Error: "Foreign key constraint"**
- Solution: CASCADE handles this automatically
- Fallback: Check for orphaned records in other tables

**Error: "Slow migration"**
- Solution: Normal if large data exists
- Monitor: Check Supabase resource usage

---

## 📝 SIGN-OFF

**Migration Executed By:** ________________  
**Date:** ________________  
**Time Started:** ________________  
**Time Completed:** ________________  
**Result:** ✅ SUCCESS / ❌ ROLLBACK  
**Notes:** ________________________________________

---

**Status:** ✅ Ready for Production Deployment

