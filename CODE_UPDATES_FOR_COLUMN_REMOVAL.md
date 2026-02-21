# Code Updates Required After Column Removal

## Overview
After running the migration `20251127_consolidate_duplicate_columns.sql`, the following deprecated columns will be **DROPPED** from the database:

**Condition Columns:** scratches, dents, back_dents, battery_health_percentage, battery_health_iphone
**Functionality Columns:** power_on, turns_on, charges, touch_ok, touch_issues, front_back_camera
**Accessories Columns:** box, original_box_included, charger, original_charger_included
**Other Columns:** warranty_valid_till, others, known_issues, other_damages, ram_ssd_upgraded, imei_1, imei1, imei2

This document tracks all code references that need updating.

---

## STEP 1: Search for Deprecated Column References

### Run these searches in your codebase to find all references:

```powershell
# Search for all deprecated column references in code
grep -r "scratches['\"]" src/ --include="*.ts" --include="*.tsx" --include="*.js"
grep -r "dents['\"]" src/ --include="*.ts" --include="*.tsx" --include="*.js"
grep -r "battery_health_percentage" src/ --include="*.ts" --include="*.tsx" --include="*.js"
grep -r "power_on['\"]" src/ --include="*.ts" --include="*.tsx" --include="*.js"
grep -r "turns_on" src/ --include="*.ts" --include="*.tsx" --include="*.js"
grep -r "charges['\"]" src/ --include="*.ts" --include="*.tsx" --include="*.js"
grep -r "touch_ok" src/ --include="*.ts" --include="*.tsx" --include="*.js"
grep -r "front_back_camera" src/ --include="*.ts" --include="*.tsx" --include="*.js"
grep -r "original_box_included" src/ --include="*.ts" --include="*.tsx" --include="*.js"
grep -r "original_charger_included" src/ --include="*.ts" --include="*.tsx" --include="*.js"
grep -r "imei_1" src/ --include="*.ts" --include="*.tsx" --include="*.js"
grep -r "warranty_valid_till" src/ --include="*.ts" --include="*.tsx" --include="*.js"
grep -r "known_issues" src/ --include="*.ts" --include="*.tsx" --include="*.js"
grep -r "other_damages" src/ --include="*.ts" --include="*.tsx" --include="*.js"
grep -r "ram_ssd_upgraded" src/ --include="*.ts" --include="*.tsx" --include="*.js"
```

---

## STEP 2: Primary Files to Update

### **File: `src/services/formDataMapper.ts` (220 lines)**
**Purpose:** Maps form field names to database canonical column names
**Action Required:** ✅ HIGHEST PRIORITY

**Check for:**
- Any mappings TO deprecated columns
- Any mappings FROM deprecated columns
- Field name transformations

**Expected Changes:**
- Ensure ALL form inputs map to canonical columns ONLY
- Example: `scratches` → `scratches_present`
- Remove any reverse mappings from deprecated columns

**Code Pattern to Look For:**
```typescript
// WRONG (after migration):
const mapping = {
  scratches: data.scratches,  // Column no longer exists!
  dents: data.dents,          // Column no longer exists!
}

// RIGHT (after migration):
const mapping = {
  scratches_present: data.scratches || data.scratches_present,
  dents_present: data.dents || data.dents_present,
}
```

---

### **File: `src/services/contractGenerationEngine.ts` (1853 lines)**
**Purpose:** Contract generation and placeholder replacement
**Action Required:** ✅ HIGH PRIORITY

**Check for:**
- Field variations map (lines 1663-1730)
- Placeholder replacement logic
- Any direct column references

**Expected Changes:**
- Update fieldVariations map to remove references to dropped columns
- Remove duplicate field lookups that pointed to deprecated columns

**Field Variations to Update:**
```typescript
// BEFORE (includes deprecated columns):
const fieldVariations: Record<string, string[]> = {
  scratches_present: ['scratches_present', 'scratches'],        // Remove 'scratches'
  dents_present: ['dents_present', 'dents', 'back_dents'],     // Remove 'dents', 'back_dents'
  battery_health_percent: ['battery_health_percent', 'battery_health_percentage'],  // Remove percentage
  power_on_working: ['power_on_working', 'power_on', 'turns_on'],  // Remove power_on, turns_on
  charging_working: ['charging_working', 'charges'],           // Remove 'charges'
  touchscreen: ['touchscreen', 'touch_ok', 'touch_issues'],   // Remove touch_*
  camera_ok: ['camera_ok', 'front_back_camera'],             // Remove front_back_camera
  original_box: ['original_box', 'box', 'original_box_included'],  // Remove box, *_included
  original_charger: ['original_charger', 'charger', 'original_charger_included'],  // Remove *
};

// AFTER (only canonical columns):
const fieldVariations: Record<string, string[]> = {
  scratches_present: ['scratches_present'],
  dents_present: ['dents_present'],
  battery_health_percent: ['battery_health_percent'],
  power_on_working: ['power_on_working'],
  charging_working: ['charging_working'],
  touchscreen: ['touchscreen'],
  camera_ok: ['camera_ok'],
  original_box: ['original_box'],
  original_charger: ['original_charger'],
};
```

---

### **File: `src/components/ContractGenerationUI.tsx` (1319 lines)**
**Purpose:** UI orchestration for contract generation
**Action Required:** ✅ MEDIUM PRIORITY

**Check for:**
- Form field destructuring
- Data object key access
- State management accessing old columns

**Expected Changes:**
- Update any references to deprecated column names in form state
- Update destructuring patterns

---

### **File: `src/services/contractGenerationEngine.ts` - enrichFormData() (lines 1550-1621)**
**Purpose:** Data enrichment and normalization
**Action Required:** ✅ MEDIUM PRIORITY

**Check for:**
- Fallback logic that references deprecated columns
- Null/undefined checks for old column names

**Expected Changes:**
- Remove fallback checks for deprecated columns
- Simplify logic to only use canonical columns

---

## STEP 3: Server-Side Updates

### **File: `server/index.js`**
**Purpose:** Backend API handling form submissions
**Action Required:** ✅ MEDIUM PRIORITY

**Check for:**
- INSERT statements with deprecated column names
- Query builders that reference old columns
- Response mappings

**Expected Changes:**
- Update any INSERT/UPDATE queries to use canonical columns only
- Remove field transformations for deprecated columns

---

## STEP 4: Frontend Form Components

### **Pattern Search Across Components:**
Search for patterns like:
```typescript
// Any form field mapping to deprecated columns
form_data[deprecated_column] = value;

// Any API calls sending to deprecated columns
const payload = { scratches: value };  // Should be scratches_present

// Any destructuring from deprecated columns
const { scratches, dents, battery_health_percentage } = data;  // Update names
```

### **Affected Component Files to Check:**
- `src/components/AddListingForm.tsx`
- `src/components/DeliveryProofUpload.tsx`
- `src/components/AiAgreementGenerator.tsx`
- `src/components/ContractBuilder.tsx`
- Any custom form components

---

## STEP 5: Testing Checklist

After updating all code, run these tests:

```bash
# 1. Run TypeScript compiler to check for type errors
npm run build

# 2. Check for remaining string references to deprecated columns
grep -r "scratches['\"]:\|dents['\"]:\|battery_health_percentage" src/ --include="*.ts" --include="*.tsx" --include="*.js"

# 3. Local testing - fill form and generate contract
# - Verify all form fields capture correctly
# - Verify contract placeholders are replaced with actual values
# - Check browser console for no errors

# 4. Database check - run these queries in Supabase:
SELECT COUNT(*) FROM information_schema.columns 
WHERE table_name='form_submissions' AND column_name IN ('scratches', 'dents', 'battery_health_percentage');
-- Expected result: 0 (all columns dropped)

SELECT COUNT(*) FROM information_schema.columns 
WHERE table_name='form_submissions' AND column_name IN ('scratches_present', 'dents_present', 'battery_health_percent');
-- Expected result: 3 (all canonical columns exist)
```

---

## STEP 6: Deployment Order

1. ✅ **Phase 1**: Run migration in Supabase (drops deprecated columns)
2. ✅ **Phase 2**: Update all code files (20-30 minutes)
3. ✅ **Phase 3**: Run TypeScript compiler check (`npm run build`)
4. ✅ **Phase 4**: Local testing (form + contract generation)
5. ✅ **Phase 5**: Deploy to production
6. ✅ **Phase 6**: Monitor placeholder replacement success rate

---

## STEP 7: Canonical Columns Reference (DO NOT DROP)

**These columns MUST remain after migration:**

| Category | Canonical Column | Keep Reason |
|----------|------------------|------------|
| IMEI | imei | Primary phone identifier |
| IMEI | imei_2 | Dual-SIM secondary identifier |
| Condition | scratches_present | What formDataMapper produces |
| Condition | dents_present | What formDataMapper produces |
| Condition | battery_health_percent | What formDataMapper produces |
| Functionality | power_on_working | What formDataMapper produces |
| Functionality | charging_working | What formDataMapper produces |
| Functionality | screen_ok | Binary yes/no status |
| Functionality | touchscreen | Binary yes/no status |
| Functionality | camera_ok | Binary yes/no status |
| Accessories | original_box | What formDataMapper produces |
| Accessories | original_charger | What formDataMapper produces |
| Warranty | warranty_valid_until | Canonical date field |
| Accessories | other_accessories | Additional items |
| Defects | known_defects | Defect descriptions |
| Hardware | ssd_ram_replaced | Hardware upgrades |

---

## STEP 8: Rollback Plan (If Needed)

If issues occur after dropping columns:

```sql
-- Note: Data cannot be recovered once columns are dropped
-- This is why the migration consolidates data FIRST before dropping

-- If you need to restore:
-- 1. Stop production traffic
-- 2. Restore database from Supabase backup (within last 24-30 days)
-- 3. Re-run Phase 1 migration (consolidation only)
-- 4. Deploy old code version
-- 5. Gradually migrate to new code
```

**IMPORTANT:** Make sure to take a Supabase backup BEFORE running the migration!

---

## STEP 9: Summary of Changes

**Total Files to Update:** ~8-12 files
**Estimated Time:** 30-45 minutes
**Complexity:** Low (mostly search-and-replace)
**Risk Level:** Low (data already consolidated)
**Rollback Difficulty:** High (columns permanently dropped - use backups)

**Key Principle:** All data is already consolidated to canonical columns BEFORE we drop the deprecated ones, so there's zero data loss.

---

## Next Steps

1. Run the migration in Supabase
2. Use Step 1's grep commands to find all deprecated column references
3. Update each file using the patterns shown in Step 2-4
4. Run TypeScript build check
5. Test locally
6. Deploy to production
7. Monitor success rate

**Questions?** Check the `deprecated_columns_mapping` and `consolidation_summary` views in Supabase after migration for verification.
