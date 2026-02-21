# Quick Test Guide - Placeholder Text Fix

## What Was Fixed

The system now fetches user input data from the `form_submissions` table to populate contract templates. Placeholders like `{{scratches_present}}` now show actual values like `yes`, `no`, or `87%`.

## Quick Test (5 Minutes)

### Step 1: Fill the Form
1. Open the application
2. Select "Mobile" as product category
3. Fill the form with test data:
   - Product Name: S25 Ultra
   - Brand: Samsung
   - Model: N/A
   - Serial: N/A
   - Condition: new
   - **Scratches: Yes** ✓
   - **Dents: No** ✓
   - **Battery Health: 87%** ✓
   - **Power ON: Yes** ✓
   - **Charging: Yes** ✓
   - Price: 25000
   - Delivery: courier

### Step 2: Open DevTools Console
- Press `F12` or Right-click → Inspect
- Go to "Console" tab
- **Leave console open** while generating contract

### Step 3: Generate Contract
1. Click "Generate Contract" button
2. **Watch the console** - you should see logs like:
   ```
   💾 STEP 1: Saving form data...
   📥 STEP 2: Fetching saved form data from form_submissions table...
   ✅ Fetched form submission from database: {...}
   🔍 Key product fields from database:
      - scratches_present: yes TYPE: string
      - dents_present: no TYPE: string
      - battery_health_percent: 87 TYPE: number
   ```

### Step 4: Check Contract Output
After contract is generated, look at the review screen and search for:

**Expected to see:**
```
USER-PROVIDED (Seller/Buyer Input):
  □ Scratches: yes
  □ Dents: no
  □ Battery Health: 87%
  □ Power ON: yes
  □ Charging: yes
```

**Should NOT see:**
```
  □ Scratches: {{scratches_present}}
  □ Dents: {{dents_present}}
  □ Battery Health: {{battery_health_percent}}%
```

## Console Logs to Verify

### ✅ Good Logs (Fix Working)
```
📥 STEP 2: Fetching saved form data from form_submissions table...
✅ Fetched form submission from database: {scratches_present: "yes", dents_present: "no", ...}
🔍 REPLACEPLCEHOLDERS: Starting replacement
   - scratches_present: yes
   - dents_present: no
   - battery_health_percent: 87
✅ Placeholder: {{scratches_present}}, FieldName: scratches_present, Value: yes
✅ Replacement complete: 28/30 placeholders replaced
```

### ⚠️ Warning Logs (Fallback Working)
```
⚠️ No form submission found in DB, will map state.formData to get proper field names
✅ Mapped state.formData to get field names: {scratches_present: "yes", ...}
✅ Found field variation for scratches_present: using scratches = yes
```

### ❌ Error Logs (Problem!)
```
❌ Missing field: scratches_present
❌ Missing field: dents_present
✅ Replacement complete: 24/30 placeholders replaced
```

If you see these, the form fields aren't being properly mapped.

## Field Values Reference

### What You Enter in Form vs What You See in Contract

| You Select | Stored In DB | Shows In Contract |
|---|---|---|
| Scratches: Yes | scratches_present: yes | Scratches: yes ✓ |
| Dents: No | dents_present: no | Dents: no ✓ |
| Battery: 87% | battery_health_percent: 87 | Battery Health: 87% ✓ |
| Power ON: Yes | power_on_working: yes | Power ON: yes ✓ |
| Charging: Yes | charging_working: yes | Charging: yes ✓ |

## Troubleshooting

### Problem: Still Seeing Placeholders in Contract

**Check 1: Form Fields Not Filled?**
```
Look in console for:
📋 Full form data: {scratches: undefined, dents: undefined, ...}
```
If fields are undefined, they weren't captured from form input.

**Check 2: Database Save Failed?**
```
Look for:
❌ Could not save form data details: [error message]
```
If save failed, no data was stored to fall back on.

**Check 3: Fetch Failed?**
```
Look for:
⚠️ Error fetching form submission: [error]
```
If fetch failed, it should use fallback mapping. Check if fallback happened:
```
✅ Mapped state.formData to get field names: {...}
```

**Check 4: Field Name Mismatch?**
```
Look for:
❌ Missing field: scratches_present
```
If specific fields are missing, the field mapping might be wrong.

### Problem: Only Some Placeholders Showing Values

This is actually OK! It means:
- The fix is partially working
- Some fields were found in form_submissions
- Some fields might not have been filled in the form

Check which fields are missing:
```
✅ Replacement complete: 26/30 placeholders replaced
❌ Missing fields: [...list of missing fields...]
```

The missing fields are likely optional fields you didn't fill in the form.

## Advanced Debugging

### See All Form Data Being Saved

```
Look for this log:
📋 Form data record prepared (FLATTENED): {
  product_name: "S25 Ultra",
  brand: "Samsung",
  scratches_present: "yes",
  dents_present: "no",
  battery_health_percent: 87,
  ... [180+ fields]
}
```

This shows exactly what's being saved to form_submissions.

### See All Form Data Being Fetched

```
Look for this log:
✅ Fetched form submission from database: {
  id: "db-id",
  transaction_id: "uuid",
  user_id: "user-id",
  scratches_present: "yes",
  dents_present: "no",
  battery_health_percent: 87,
  ... [all saved fields]
}
```

This shows exactly what came back from the database.

### See Placeholder Replacement Details

```
Look for these logs during replacement:
🔍 Placeholder: {{scratches_present}}, FieldName: scratches_present, Value: yes
🔍 Placeholder: {{dents_present}}, FieldName: dents_present, Value: no
✅ Found field variation for power_on_working: using power_on = yes
```

This shows exactly which placeholders were replaced and with what values.

## Success Criteria

- [ ] Form fills and saves without errors
- [ ] Console shows "Fetched form submission from database" or "Mapped state.formData"
- [ ] Console shows replacement logs with actual values (not undefined/null)
- [ ] Contract output shows actual values (yes/no/87%) instead of {{placeholders}}
- [ ] No red ❌ error logs in console related to form fields

## Expected Behavior Timeline

1. **Fill form** → 1 second
2. **Click Generate** → Console starts showing logs
   - STEP 1 save takes ~1 second
   - STEP 2 fetch takes ~0.5 seconds
   - Contract generation takes ~1 second
3. **Total time**: ~3-5 seconds
4. **Result**: Contract displays with all values replaced

## If Fix Isn't Working

After testing, please share:
1. The console output (screenshot or text)
2. What values you entered in the form
3. What values appear in the contract output
4. Any error messages shown

This will help identify which part of the pipeline needs fixing.

## Related Documentation

- `PLACEHOLDER_FIX_SUMMARY.md` - Complete technical explanation
- `DATA_FETCHING_FLOW.md` - Detailed data flow diagram
- `PLACEHOLDER_DEBUG_GUIDE.md` - Advanced debugging guide
