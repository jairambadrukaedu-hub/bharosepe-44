# Placeholder Text Debug Guide

## Problem
Contract output shows placeholder text ({{scratches_present}}, {{battery_health_percent}}, etc.) instead of actual values from the database.

## Root Cause Investigation
Added comprehensive logging throughout the contract generation pipeline to trace data flow:

### STEP 1: Form Save to Database
**Function**: `saveFormToDatabase()` in `ContractGenerationUI.tsx`
**What to check in console**:
```
💾 Saving form data to database...
📋 Full form data: {...}
📋 Form data record prepared (FLATTENED): {...}
✅ Total fields in record: [number]
🔍 Key product fields:
   - scratches_present: [value]
   - dents_present: [value]
   - battery_health_percent: [value]
   - power_on_working: [value]
   - charging_working: [value]
   - imei_1: [value]
```

**What it means**:
- If these fields show values (not undefined/null), the mapping is working
- If null/undefined, the formDataMapper isn't capturing the form input

### STEP 2: Fetch from Database
**Function**: Fetch block in `handleGenerateContract()` at line 445
**What to check in console**:
```
📥 STEP 2: Fetching saved form data from form_submissions table...
✅ Fetched form submission from database: {...}
🔍 Key product fields from database:
   - scratches_present: [value] TYPE: [type]
   - dents_present: [value] TYPE: [type]
   - battery_health_percent: [value] TYPE: [type]
   - power_on_working: [value] TYPE: [type]
   - charging_working: [value] TYPE: [type]
   - imei_1: [value] TYPE: [type]

🔍 Original field names from database:
   - scratches: [value]
   - dents: [value]
   - battery_health_percentage: [value]
   - power_on: [value]
   - charging_working: [value]
```

**What it means**:
- If mapped fields (scratches_present, etc.) show values, the database save worked
- If showing undefined/null, either save failed or the fetch is wrong
- TYPE should be 'string' or 'number' depending on the field

### STEP 3: Merge Into contractData
**Function**: Contract data preparation at line 657
**What to check in console**:
```
🔍 CONDITION FIELDS IN contractData (before engine):
   state.formData.scratches: [value]
   state.formData.dents: [value]
   state.formData.battery_health_percentage: [value]
   state.formData.power_on: [value]
   state.formData.charging_working: [value]
   ---
   contractData.scratches_present: [value]
   contractData.dents_present: [value]
   contractData.battery_health_percent: [value]
   contractData.power_on_working: [value]
   contractData.charging_working: [value]
   contractData.imei_1: [value]
```

**What it means**:
- state.formData fields have original names (scratches, not scratches_present)
- contractData should have BOTH original and mapped names, with mapped taking precedence
- If contractData mapped fields are null/undefined, the merge didn't work

### STEP 4: Engine Enrichment
**Function**: `enrichFormData()` in `contractGenerationEngine.ts`
**What to check in console**:
```
📊 ENRICH FORM DATA STARTED
   Input formData keys: [number]
   Checking for pre-enriched fields:
     - scratches_present: [value]
     - dents_present: [value]
     - battery_health_percent: [value]
     - power_on_working: [value]
     - charging_working: [value]
   isAlreadyEnriched: [true/false]
   
✅ Data already enriched with product fields, skipping database fetch

🔍 Final merged data - product fields:
   - scratches_present: [value]
   - dents_present: [value]
   - battery_health_percent: [value]
   - power_on_working: [value]
   - charging_working: [value]
   - imei_1: [value]
   - condition_category: [value]
```

**What it means**:
- If `isAlreadyEnriched: true`, the data came pre-enriched from contractData
- If `isAlreadyEnriched: false`, it tried to fetch from DB again (may not find it)
- Final merged data should have actual values, not null/undefined

### STEP 5: Placeholder Replacement
**Function**: `replacePlaceholders()` in `contractGenerationEngine.ts`
**What to check in console**:
```
🔍 REPLACEPLCEHOLDERS: Starting replacement with condition fields:
   - scratches_present: [value]
   - dents_present: [value]
   - battery_health_percent: [value]
   - power_on_working: [value]
   - charging_working: [value]
   - imei_1: [value]

🔍 Placeholder: {{scratches_present}}, FieldName: scratches_present, Value: [value]
🔍 Placeholder: {{dents_present}}, FieldName: dents_present, Value: [value]
🔍 Placeholder: {{battery_health_percent}}, FieldName: battery_health_percent, Value: [value]
...
```

**What it means**:
- If Value shows actual data (yes/no/87/etc), the replacement should work
- If Value shows undefined/null, the placeholder won't be replaced
- The console should show ALL these specific placeholders being processed

## Testing Procedure

1. **Fill out form** with a test mobile phone:
   - Scratches: Yes
   - Dents: No
   - Battery Health: 87%
   - Power On: Yes
   - Charging: Yes
   - IMEI: 123456789012345

2. **Open browser DevTools** (F12 or Right-click > Inspect)

3. **Click "Generate Contract"** and watch the console logs

4. **Check each STEP**:
   - Are values being saved to DB? (STEP 1)
   - Are values being fetched from DB? (STEP 2)
   - Are values in contractData? (STEP 3)
   - Are values reaching replacePlaceholders? (STEP 5)

## Expected vs Actual

### Expected Output (If working):
```
CONTRACT OUTPUT:
  USER-PROVIDED (Seller/Buyer Input):
    □ Scratches: yes
    □ Dents: no
    □ Battery Health: 87%
    □ Power ON: yes
    □ Charging: yes
```

### Actual Output (Current issue):
```
CONTRACT OUTPUT:
  USER-PROVIDED (Seller/Buyer Input):
    □ Scratches: {{scratches_present}}
    □ Dents: {{dents_present}}
    □ Battery Health: {{battery_health_percent}}%
    □ Power ON: {{power_on_working}}
    □ Charging: {{charging_working}}
```

## Possible Root Causes

Based on the logging output, the issue could be:

1. **STEP 1 Failure**: Form values not being captured by formDataMapper
   - Fix: Check if form field names match mapper expectations

2. **STEP 2 Failure**: Fetch not returning data
   - Fix: Verify transaction_id is correct and matches saved record

3. **STEP 3 Failure**: contractData not getting merged values
   - Fix: Verify savedFormData is being spread correctly

4. **STEP 4 Failure**: enrichFormData not detecting pre-enriched data
   - Fix: Check if isAlreadyEnriched detection logic needs updating

5. **STEP 5 Failure**: Placeholder names in template don't match field names
   - Fix: Update placeholder names to use mapped names (scratches_present not scratches)

## Field Name Mapping Reference

| Form Field Name | Database Column | Template Placeholder |
|---|---|---|
| scratches | scratches, scratches_present | {{scratches_present}} |
| dents | dents, dents_present | {{dents_present}} |
| back_dents | back_dents, dents_present | {{dents_present}} |
| battery_health_percentage | battery_health_percentage, battery_health_percent | {{battery_health_percent}} |
| power_on | power_on, power_on_working | {{power_on_working}} |
| turns_on | power_on, power_on_working | {{power_on_working}} |
| charging_working | charging_working, charges | {{charging_working}} |
| imei | imei, imei_1 | {{imei_1}} |

## Next Steps

After checking the console logs:

1. Identify which STEP is failing
2. Report the specific console output
3. We can then fix that specific step
4. Verify with a fresh test generation
