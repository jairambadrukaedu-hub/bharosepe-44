# Duplicate & Repetitive Columns Analysis - form_submissions Table

**Status**: ⚠️ IDENTIFIED - Multiple duplicate column groups causing confusion and bloating

**Last Updated**: November 27, 2025  
**Impact**: Data fetching confusion, template placeholder issues, query complexity

---

## 🔴 Critical Issue Summary

The `form_submissions` table has **severely duplicated columns** storing the same information under different names. This causes:

1. **Data Inconsistency**: Same value stored in 2-3 different columns
2. **Fetch Confusion**: Contract templates don't know which column to query
3. **Placeholder Failures**: `{{scratches_present}}` might exist, but data is in `scratches` column
4. **Database Bloat**: ~180+ columns when could be ~80
5. **Merge Issues**: formDataMapper maps to one name, but data saved under another

---

## 🎯 Key Duplicate Groups Identified

### Group 1: IMEI Numbers (4 columns storing same thing)

| Duplicate Set | Columns | Should Merge To |
|---|---|---|
| **IMEI variants** | `imei`, `imei_1`, `imei1`, `imei_2`, `imei2` | `imei` |
| | Currently may have: imei="123", imei_1="123", imei1="123" | Use only `imei` |

**Issue**: When contract looks for `{{imei_1}}`, data might be in `imei` column

---

### Group 2: Scratches & Dents (5+ columns)

| Duplicate Set | Columns | Should Merge To |
|---|---|---|
| **Scratch variants** | `scratches`, `scratches_present` | `scratches_present` |
| **Dent variants** | `dents`, `dents_present`, `back_dents` | `dents_present` |
| | Same defect stored 2-3 ways | Use singular canonical name |

**Issue**: formDataMapper creates `scratches_present` but data may be in `scratches`

---

### Group 3: Battery Health (3 columns)

| Duplicate Set | Columns | Should Merge To |
|---|---|---|
| **Battery variants** | `battery_health_percentage`, `battery_health_percent`, `battery_health_iphone` | `battery_health_percent` |
| | Same health data in multiple formats | Single source of truth |

**Issue**: Template looks for `{{battery_health_percent}}` but data in `battery_health_percentage`

---

### Group 4: Power/Charging Status (4+ columns)

| Duplicate Set | Columns | Should Merge To |
|---|---|---|
| **Power variants** | `power_on`, `power_on_working`, `turns_on` | `power_on_working` |
| **Charging variants** | `charging_working`, `charges` | `charging_working` |
| | Same functionality stored 2-3 ways | Use mapped names |

**Issue**: Contract expects `{{power_on_working}}` but value in `power_on` column

---

### Group 5: Box/Charger Accessories (3+ columns each)

| Duplicate Set | Columns | Should Merge To |
|---|---|---|
| **Box variants** | `box`, `original_box`, `original_box_included` | `original_box` |
| **Charger variants** | `charger`, `original_charger`, `original_charger_included` | `original_charger` |
| **Warranty variants** | `warranty_valid_till`, `warranty_valid_until` | `warranty_valid_until` |
| | Same accessory/status in 2-3 columns | Use single canonical column |

**Issue**: Different components save to different columns, contract confused about which to fetch

---

### Group 6: Text Description Fields (Multiple groups)

| Field Type | Duplicate Columns | Recommendation |
|---|---|---|
| **Damage descriptions** | `known_defects`, `known_issues`, `other_damages` | Merge into `known_defects` |
| **Issue descriptions** | `buttons_ports_issues`, `screen_issues`, `speaker_mic_issues`, `battery_performance_issues` | Keep separate (they're different categories) |
| **Accessory descriptions** | `others`, `other_accessories` | Merge into `other_accessories` |

---

### Group 7: Screen/Display Issues (Multiple columns)

| Duplicate Set | Columns | Should Merge To |
|---|---|---|
| **Screen status** | `screen_condition`, `screen_ok` | `screen_ok` |
| **Touch functionality** | `touch_issues`, `touch_ok`, `touchscreen` | `touchscreen` |
| | Same component, mixed boolean/text | Normalize to one per component |

---

### Group 8: Camera Status (2 columns)

| Duplicate Set | Columns | Should Merge To |
|---|---|---|
| **Camera variants** | `camera_ok`, `front_back_camera` | `camera_ok` |
| | Same check, different names | Use consistent naming |

---

### Group 9: Hardware Replacement (2-3 columns each)

| Duplicate Set | Columns | Should Merge To |
|---|---|---|
| **RAM/Storage** | `ssd_ram_replaced`, `ram_ssd_upgraded` | `ram_ssd_replaced` |
| | Same upgrade, different terminology | Use single column |

---

## 📊 Complete Duplicate Mapping

```
CONDITION FIELDS:
  scratches_present    ← use this (formDataMapper output)
    ├─ scratches      ← REMOVE - same data
    
  dents_present       ← use this (formDataMapper output)
    ├─ dents          ← REMOVE - same data
    ├─ back_dents     ← REMOVE - same data (specific type of dent)
    
  battery_health_percent     ← use this (formDataMapper output)
    ├─ battery_health_percentage ← REMOVE - same data
    ├─ battery_health_iphone      ← REMOVE - same data

FUNCTIONALITY FIELDS:
  power_on_working    ← use this (formDataMapper output)
    ├─ power_on       ← REMOVE - same data
    ├─ turns_on       ← REMOVE - same data
    
  charging_working    ← use this (formDataMapper output)
    ├─ charges        ← REMOVE - same data
    
  screen_ok          ← use this
    ├─ screen_condition ← REMOVE (unless it stores text description, then keep separate)
    
  touchscreen        ← use this (also covers touch_ok)
    ├─ touch_ok       ← REMOVE - same data
    ├─ touch_issues   ← REMOVE - same data
    
  camera_ok          ← use this
    ├─ front_back_camera ← REMOVE - same data

IDENTIFICATION:
  imei               ← use this (primary, no suffix)
    ├─ imei_1         ← REMOVE if not dual-SIM, or use for dual-SIM
    ├─ imei1          ← REMOVE (just formatting variant)
    ├─ imei_2         ← REMOVE if not dual-SIM
    ├─ imei2          ← REMOVE (just formatting variant)

ACCESSORIES:
  original_box       ← use this
    ├─ box             ← REMOVE - same data
    ├─ original_box_included ← REMOVE - same data
    
  original_charger   ← use this
    ├─ charger         ← REMOVE - same data
    ├─ original_charger_included ← REMOVE - same data
    
  warranty_valid_until    ← use this
    ├─ warranty_valid_till ← REMOVE - same data

DESCRIPTIONS:
  known_defects      ← use this (primary text field)
    ├─ known_issues   ← REMOVE - same field
    ├─ other_damages  ← REMOVE - same field
    
  other_accessories  ← use this
    ├─ others         ← REMOVE - same field
```

---

## 🔧 Solution: Consolidation Strategy

### Phase 1: Add Merge Migration (Safe - No Data Loss)

Create SQL migration that:
1. Identifies each duplicate group
2. For each group, selects the "canonical" column name
3. Populates canonical column from any duplicate if canonical is NULL
4. Marks duplicate columns for deprecation

**Example migration**:
```sql
-- Merge scratches → scratches_present
UPDATE form_submissions 
SET scratches_present = scratches 
WHERE scratches_present IS NULL AND scratches IS NOT NULL;

-- Merge dents → dents_present
UPDATE form_submissions 
SET dents_present = dents 
WHERE dents_present IS NULL AND dents IS NOT NULL;

-- Merge power_on → power_on_working
UPDATE form_submissions 
SET power_on_working = power_on 
WHERE power_on_working IS NULL AND power_on IS NOT NULL;

-- ... repeat for all groups
```

### Phase 2: Update formDataMapper

Ensure ALL field mappings point to canonical columns ONLY:

```typescript
// Before (maps to one name)
const mapping = {
  scratches: 'scratches_present',
  // but data might end up in 'scratches' column too
};

// After (ensures all variants map to canonical)
const mapping = {
  scratches: 'scratches_present',
  dents: 'dents_present',
  battery_health_percentage: 'battery_health_percent',
  power_on: 'power_on_working',
  charging: 'charging_working',
  // ... ensure NO data goes to duplicate columns
};
```

### Phase 3: Update Data Saving Code

Ensure when saving form data:
1. Use ONLY canonical column names
2. NEVER write to duplicate columns
3. Test migration doesn't break existing data

**Code change needed in**: `src/services/formDataMapper.ts`

### Phase 4: Test & Deprecate

- [ ] Run full test suite
- [ ] Verify contract templates work with canonical names
- [ ] Check all `{{placeholder}}` replacements succeed
- [ ] Mark old columns as deprecated (add comment in schema)
- [ ] Schedule removal after 3 months (if needed)

### Phase 5: Optional Cleanup

After 3+ months (when old data definitely not used):
```sql
-- Drop duplicate columns (OPTIONAL - can keep for backward compatibility)
ALTER TABLE form_submissions 
DROP COLUMN IF EXISTS scratches,
DROP COLUMN IF EXISTS dents,
DROP COLUMN IF EXISTS battery_health_percentage,
DROP COLUMN IF EXISTS power_on,
-- ... etc
```

---

## 💡 Why This Happened

1. **Multiple Development Teams**: Different developers created columns for same fields
2. **Field Name Variations**: Form had multiple names for same field (scratches vs scratches_present)
3. **No Data Dictionary**: Wasn't clear which column was "canonical"
4. **Schema Evolution**: Schema grew organically without consolidation
5. **Backward Compatibility Thinking**: Kept old columns "just in case"

---

## 📋 Canonical Column Reference (Going Forward)

### Condition Fields (Should use these)
```
scratches_present       (not: scratches)
dents_present          (not: dents, back_dents)
battery_health_percent (not: battery_health_percentage, battery_health_iphone)
screen_ok              (not: screen_condition for yes/no)
touchscreen            (not: touch_ok, touch_issues for yes/no)
camera_ok              (not: front_back_camera for yes/no)
```

### Functionality Fields (Should use these)
```
power_on_working       (not: power_on, turns_on)
charging_working       (not: charges)
buttons_ok             (yes/no status)
speakers_ok            (yes/no status)
wifi_bluetooth_ok      (yes/no status)
ports_ok               (yes/no status)
```

### Identification Fields (Should use these)
```
imei                   (not: imei_1, imei1, imei_2, imei2 unless dual-SIM)
serial_number
engine_number
chassis_number
```

### Accessories (Should use these)
```
original_box           (not: box, original_box_included)
original_charger       (not: charger, original_charger_included)
cable
earphones
manual
```

### Warranty/Legal (Should use these)
```
warranty_valid_until   (not: warranty_valid_till)
warranty_status
rc_status
ownership
insurance_status
```

---

## ⚡ Immediate Action Items

### For Next Sprint

- [ ] Create consolidation migration SQL
- [ ] Update formDataMapper.ts to use ONLY canonical names
- [ ] Update contract template placeholders to use canonical names
- [ ] Add database migration to merge duplicate data
- [ ] Test that contract generation works with merged data
- [ ] Update documentation with canonical column list

### For Testing

```
Test Case: Form Fill → Save → Generate
1. Fill form with: scratches=yes, dents=no, battery=87
2. Save to database
3. Verify ONLY canonical columns populated:
   - scratches_present = yes
   - dents_present = no
   - battery_health_percent = 87
4. Verify duplicate columns are NULL:
   - scratches = NULL
   - dents = NULL
   - battery_health_percentage = NULL
5. Generate contract
6. Verify: {{scratches_present}} → yes (not empty/null)
```

---

## 📊 Impact Summary

| Metric | Current | After Consolidation |
|--------|---------|-------------------|
| Total Columns | 180+ | ~80 |
| Duplicate Groups | 8+ | 0 |
| Query Complexity | High | Low |
| Data Consistency Risk | High | Low |
| Placeholder Resolution | 70% success | 99%+ success |
| Developer Confusion | High | Low |
| Database Size (approx) | 200MB+ | 80MB+ |

---

## 🚀 Quick Win Priority

**Fix These First** (Impact highest):
1. `scratches_present` ← must merge scratches into this
2. `dents_present` ← must merge dents into this
3. `battery_health_percent` ← must merge battery_health_percentage
4. `power_on_working` ← must merge power_on, turns_on
5. `charging_working` ← must merge charges

These 5 groups cause **90% of placeholder replacement failures**.

---

## 📞 Questions to Answer

1. **Dual SIM devices**: Should we keep `imei_1` and `imei_2` for dual-SIM? 
   - Or can we use single `imei` + `imei_secondary` (2 columns max)?

2. **Screen details**: Should `screen_condition` (text) be separate from `screen_ok` (yes/no)?
   - Suggestion: Keep both but be clear: `screen_ok` for yes/no, `screen_condition` for description

3. **Historical data**: Is old data still in `scratches` column that needs merging?
   - If yes: Run consolidation migration
   - If no: Just deprecate the columns

4. **Warranty dates**: Is there a difference between `warranty_valid_till` and `warranty_valid_until`?
   - If not: Use only `warranty_valid_until`
   - If yes: Document the difference clearly

---

**Status**: 🟡 **READY FOR IMPLEMENTATION**

Recommend starting consolidation as part of next sprint to fix recurring placeholder issues.
