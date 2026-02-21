# Contract Generator - Data Fetching Fix

## Problem
The contract generator was not fetching product information (scratches, dents, battery health, IMEI, etc.) from the database tables. This resulted in missing product details in the generated contracts.

## Root Cause Analysis

### Issue 1: Field Name Mismatch
The form data mapper stores fields with **canonical names** in the database:
- Database stores: `imei`, `scratches_present`, `dents_present`, `battery_health_percent`, `power_on_working`, `charging_working`
- Contract template expects: `imei_1`, `imei_2`, `scratches_present`, `dents_present`, etc.

### Issue 2: Conditional Data Fetching
The original code only fetched from `form_submissions` table when data was **not already enriched**. This meant if the in-memory state didn't have all fields, the database fetch would fail and the contract would use incomplete data.

### Issue 3: JSONB vs Flat Structure
The original code expected JSONB grouped data (`technical_specs: { ram: 8 }`), but the new schema stores data in flat individual columns.

## Solution Implemented

### 1. Added `normalizeFormDataFromDatabase()` function
Maps database columns to contract template field names:
```typescript
- Database column: imei → Template field: imei_1
- Database column: imei_2 → Template field: imei_2 (unchanged)
- All other fields use canonical names as-is
```

### 2. Updated `enrichFormData()` to ALWAYS fetch from database
Changed from conditional fetching to always fetching:
```
BEFORE:
  IF data not enriched THEN fetch from DB
  ELSE use in-memory data

AFTER:
  ALWAYS fetch from DB
  IF not found in DB, use in-memory data as fallback
```

### 3. Proper data merging
```typescript
const mergedData = {
  ...formData,                    // Start with in-memory form data
  ...(dbFormData || {}),          // Override with database data (takes precedence)
  // Add calculated fields
  sale_price: actualPrice,
  escrow_amount: escrowAmount,
  // etc.
};
```

## Key Fields Fixed

The following fields now properly flow from database → contract:

**Condition Assessment:**
- `scratches_present` - Scratches on product
- `dents_present` - Dents on product  
- `battery_health_percent` - Battery health percentage
- `power_on_working` - Device powers on status
- `charging_working` - Device charging capability

**Identification:**
- `imei` → stored as `imei_1` in template
- `imei_2` - Second IMEI for dual-SIM devices

**Product Details:**
- `condition_category` - Product condition
- `model_number` - Device model
- `serial_number` - Device serial
- `delivery_method` - Shipping method
- `delivery_address` - Delivery location

## Data Flow After Fix

```
User fills form
  ↓
Form saved to form_submissions table via mapFormDataToDatabase()
  ↓
Contract generation triggered
  ↓
enrichFormData() fetches from form_submissions
  ↓
normalizeFormDataFromDatabase() maps to template field names
  ↓
Data merged with in-memory state
  ↓
replacePlaceholders() populates all fields in contract
  ↓
Contract generated with ALL product information ✅
```

## Database Schema Assumptions

The `form_submissions` table should have these columns:
- Flat structure (not nested JSONB)
- Canonical field names: `scratches_present`, `dents_present`, `battery_health_percent`, etc.
- IMEI stored as `imei` and `imei_2` (not `imei_1`, `imei1`, `imei2`)

## Testing the Fix

To verify the fix works:

1. **Fill a form** in the contract generation UI
2. **Check browser console** for these logs:
   - ✅ "Fetched form submission from database"
   - ✅ "Normalized database fields to template fields"
   - ✅ "Replacement complete: X/Y placeholders replaced"
   
3. **Verify contract** contains:
   - Product condition details (scratches, dents)
   - Battery health percentage
   - Functional status (power, charging)
   - IMEI numbers
   - Delivery information

## Rollback Instructions

If issues occur, the original behavior can be restored by:
1. Remove calls to `normalizeFormDataFromDatabase()`
2. Change `enrichFormData()` to only fetch when data is missing
3. Use `flattenJSONBData()` instead for JSONB structures

## Files Modified

- `src/services/contractGenerationEngine.ts`
  - Added: `normalizeFormDataFromDatabase()` helper
  - Updated: `enrichFormData()` method to always fetch from DB
  - Updated: Logging for better debugging

## Related Files (No Changes Needed)

- `src/services/formDataMapper.ts` - Already uses canonical names ✅
- `src/components/ContractGenerationUI.tsx` - Already saves data correctly ✅
- Database schema - Already supports flat structure ✅
