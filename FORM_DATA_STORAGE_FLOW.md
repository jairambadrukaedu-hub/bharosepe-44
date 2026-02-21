# Form Data Flow & Storage Locations

## The Problem You're Seeing

You submitted form data for **'fashion-apparel'** category with annexure code **'E'**, but the database constraint only allowed codes `'A', 'B', 'C', 'D', 'F', 'G', 'H', 'I', 'J', 'K', 'L'` (missing **'E'**).

The error was:
```
POST https://izyhokrfpnyynohmrtvq.supabase.co/rest/v1/form_submissions 400 (Bad Request)
"new row for relation "form_submissions" violates constraint "form_submissions_annexure_code_check"
```

## WHERE Your Data is Being Saved

### 1. **LOCAL STORAGE** (Browser)
```
localStorage['bharosepe_form_draft_[transaction_id]']
```
- ✅ **SUCCESSFULLY SAVED** - All your form data is here (21 fields)
- This is why you can refresh the page and the form data is still there
- This is temporary - meant for quick recovery

### 2. **DATABASE: form_submissions TABLE** (Supabase PostgreSQL)
```sql
SELECT * FROM form_submissions WHERE transaction_id = 'a839798e-3f6e-4def-bde0-0a1fd417738a'
```
- ❌ **FAILED TO SAVE** - Blocked by database constraint
- The `.upsert()` operation is rejected at the database level
- No row is created in the table

---

## Data Mapper Flow Diagram

```
User Form Input
    ↓
ContractGenerationUI.tsx (line 522)
    ↓
mapFormDataToDatabase() function
    ↓
Creates record with:
  - 17 Direct columns (product_name, brand, description, price, etc.)
  - 4 JSONB fields (technical_specs, condition_data, warranty_legal_data, accessories_data)
    ↓
Returns 21-field record (as you see in console)
    ↓
supabase.from('form_submissions').upsert(record)
    ↓
[BLOCKED BY DATABASE CONSTRAINT]
    ❌ Annexure code 'E' not in allowed list
```

---

## The 17 Direct Columns Being Saved

These are individual TEXT/DECIMAL/DATE columns in the database:
1. `user_id` - UUID
2. `transaction_id` - TEXT (unique identifier)
3. `industry_category` - TEXT (e.g., 'fashion-apparel')
4. `annexure_code` - TEXT (e.g., 'E') **← BLOCKED HERE**
5. `form_status` - TEXT ('draft')
6. `product_name` - TEXT
7. `brand` - TEXT
8. `description` - TEXT
9. `category` - TEXT
10. `device_type` - TEXT
11. `price` - DECIMAL
12. `sale_price` - DECIMAL
13. `expected_delivery_date` - DATE
14. `inspection_window_hours` - INTEGER
15. `return_policy` - TEXT
16. `delivery_mode` - TEXT
17. `weight_category` - TEXT

---

## The 4 JSONB Fields

These store multiple related fields as JSON objects:

### 1. `technical_specs` (JSONB)
```json
{
  "color": "Blue",
  "storage": "128GB",
  "ram": "8GB"
}
```

### 2. `condition_data` (JSONB)
```json
{
  "scratches": "no",
  "dents": "no",
  "battery_health_percent": 95
}
```

### 3. `warranty_legal_data` (JSONB)
```json
{
  "warranty_status": "yes",
  "warranty_info": "1 year manufacturer",
  "ownership": "original owner"
}
```

### 4. `accessories_data` (JSONB)
```json
{
  "original_box": "yes",
  "original_charger": "yes",
  "cable": "yes"
}
```

---

## Console Output Explanation

```
formDataMapper.ts:409    Direct columns: 17         ← Individual table columns
formDataMapper.ts:410    JSONB fields: 4            ← JSON objects for grouped data

ContractGenerationUI.tsx:532 ✅ Total fields in record: 21    ← 17 + 4 = 21 fields

ContractGenerationUI.tsx:533 🔍 Key product fields:
ContractGenerationUI.tsx:534    - scratches_present: undefined     ← Inside condition_data JSONB
ContractGenerationUI.tsx:535    - dents_present: undefined          ← Inside condition_data JSONB
```

The console is showing fields that are in your **formData** but NOT in the **record** because:
- They're checked for in the direct columns section
- But they don't exist as direct columns
- Instead, they're stored inside JSONB objects

---

## The FIX

**Database Migration**: `20251127_fix_annexure_code_constraint.sql`

Currently:
```sql
CHECK (annexure_code IN ('A', 'B', 'C', 'D', 'F', 'G', 'H', 'I', 'J', 'K', 'L'))
```

After migration:
```sql
CHECK (annexure_code IN ('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'))
                                           ↑
                                      'E' added!
```

## Expected Result After Fix

When you submit the form again:
1. ✅ Mapper creates 21-field record
2. ✅ Database accepts it (constraint now includes 'E')
3. ✅ Data saved to `form_submissions` table
4. ✅ New row created with your transaction_id
5. ✅ Contract generation can fetch the data

---

## Summary

**Before Fix:**
- Form data → localStorage ✅
- Form data → Database ❌ (constraint violation)
- Contract generation → Stuck

**After Fix:**
- Form data → localStorage ✅
- Form data → Database ✅ (constraint allows 'E')
- Contract generation → Can proceed ✅
