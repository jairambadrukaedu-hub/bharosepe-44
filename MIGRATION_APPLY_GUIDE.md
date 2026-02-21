# How to Apply the Annexure Code Migration

## 🔴 CRITICAL: This migration MUST be applied to fix the form save issue

**Problem**: Form submissions for fashion-apparel (annexure_code='E') are failing with:
```
violates constraint form_submissions_annexure_code_check
```

**Solution**: Apply the migration to add 'E' to the allowed annexure codes.

---

## Option 1: Via Supabase Dashboard (Recommended - Fastest)

### Steps:

1. **Open Supabase Dashboard**
   - Go to: https://app.supabase.com
   - Select your project "bharosepe-44"

2. **Navigate to SQL Editor**
   - Click "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Copy and Execute the Migration SQL**
   - Copy the entire SQL from `supabase/migrations/20251127_fix_annexure_code_constraint.sql`
   - Paste it into the SQL editor
   - Click "RUN" button (or press Cmd/Ctrl + Enter)

4. **Verify Success**
   - You should see a success message
   - The constraint will now allow annexure codes: A, B, C, D, **E**, F, G, H, I, J, K, L

---

## Option 2: Via Supabase CLI (If installed)

### Installation:
```bash
# Windows with Chocolatey
choco install supabase

# Or via npm
npm install -g supabase
```

### After Installation:
```bash
# Navigate to project root
cd c:\Users\Abhi\Desktop\Application\bharosepe-44

# Login to Supabase
supabase login

# Push migrations
supabase db push
```

---

## The Migration SQL

```sql
-- Drop the old constraint
ALTER TABLE form_submissions 
DROP CONSTRAINT IF EXISTS form_submissions_annexure_code_check;

-- Add the corrected constraint with all 12 annexure codes including 'E'
ALTER TABLE form_submissions 
ADD CONSTRAINT form_submissions_annexure_code_check 
CHECK (annexure_code IN ('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'));
```

---

## What This Does

| Annexure Code | Product Category | Status |
|---|---|---|
| A | Electronics | ✅ Already allowed |
| B | Mobile | ✅ Already allowed |
| C | Furniture | ✅ Already allowed |
| D | Vehicles | ✅ Already allowed |
| **E** | **Fashion-apparel** | **✅ NOW ALLOWED (was missing)** |
| F | Jewellery | ✅ Already allowed |
| G | Appliances | ✅ Already allowed |
| H | Building Materials | ✅ Already allowed |
| I | Collectibles | ✅ Already allowed |
| J | Industrial | ✅ Already allowed |
| K | Books | ✅ Already allowed |
| L | Art | ✅ Already allowed |

---

## Testing After Migration

1. **Try to save a fashion-apparel form**
   - Select "Fashion & Apparel" category
   - Fill in form fields (Size: M, Condition: New, etc.)
   - Click "Save Draft" or "Generate Contract"
   - Should now succeed! ✅

2. **Expected Result**
   - Form data saves to `form_submissions` table
   - `annexure_code` column receives value 'E'
   - Contract generation can proceed

3. **If Still Failing**
   - Check browser console for error messages
   - Verify migration executed without errors
   - Check that the constraint shows in Supabase dashboard

---

## Verification Query

After applying migration, run this in Supabase SQL Editor to verify:

```sql
SELECT constraint_name, constraint_type 
FROM information_schema.table_constraints 
WHERE table_name = 'form_submissions' AND constraint_type = 'CHECK';
```

Expected output should show a row with constraint `form_submissions_annexure_code_check`.

---

## 📋 Checklist

- [ ] Opened Supabase Dashboard
- [ ] Navigated to SQL Editor
- [ ] Copied migration SQL
- [ ] Executed the migration
- [ ] Verified no errors
- [ ] Tested fashion-apparel form save
- [ ] Confirmed data appeared in form_submissions table

