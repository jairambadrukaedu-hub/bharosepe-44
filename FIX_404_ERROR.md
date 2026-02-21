# Fix: 404 Not Found Error - form_file_uploads Table

## Problem

You're getting this error:
```
404 (Not Found)
POST https://izyhokrfpnyynohmrtvq.supabase.co/rest/v1/form_file_uploads?select=*
```

And:
```
operator does not exist: uuid = text
```

## Root Cause

**The `form_file_uploads` table doesn't exist in your Supabase database yet!**

The migration file only adds a column to an existing table, but the table needs to be created first.

## Solution (2 Minutes)

### Step 1: Create the Table

1. Go to: https://app.supabase.com
2. Your project → SQL Editor
3. Click "New Query"
4. **Copy the complete SQL from:**
   ```
   migrations/complete_file_upload_setup.sql
   ```
5. Paste it into SQL Editor
6. Click "Run" (green button)

### What This Does

✅ Creates `form_file_uploads` table
✅ Adds `file_content_base64` column (TEXT for file storage)
✅ Creates 5 indexes for speed
✅ Enables RLS (Row Level Security)
✅ Adds 4 RLS policies (users can only access their own files)
✅ Creates auto-update trigger

### Step 2: Test

1. Refresh browser: http://localhost:3000
2. Go to any form
3. Upload a file
4. Should work now ✅

---

## Error Explanation

### Error 1: 404 Not Found
```
POST https://izyhokrfpnyynohmrtvq.supabase.co/rest/v1/form_file_uploads?select=*
```

**Means:** Trying to INSERT into `form_file_uploads` table but it doesn't exist

**Fix:** Run SQL migration to create the table

### Error 2: operator does not exist: uuid = text
```
operator does not exist: uuid = text
```

**Means:** `transaction_id` field expects UUID but got TEXT

**Fix:** This will automatically resolve once table is created with proper UUID column type

---

## Quick Reference

| Step | Action | Time |
|------|--------|------|
| 1 | Copy SQL from `migrations/complete_file_upload_setup.sql` | 1 min |
| 2 | Paste in Supabase SQL Editor | 1 min |
| 3 | Click Run | instant |
| 4 | Refresh browser and test | 1 min |

**Total:** ~3 minutes

---

## If You Still Get Errors

### Error: "relation 'form_file_uploads' already exists"
- This means you ran the migration twice
- Ignore the error, proceed with testing
- Or DROP the table and rerun (optional)

### Error: "relation 'public.transactions' does not exist"
- The `transactions` table is missing
- Contact support or check if you need to run other migrations first

### Upload still fails
1. Hard refresh browser: `Ctrl+Shift+R`
2. Check console (F12 → Console)
3. Copy exact error and investigate

---

## Verification

After running the migration, verify in Supabase:

1. **Go to:** Editor (left menu) → Tables
2. **Look for:** `form_file_uploads`
3. **Check columns:** Should include `file_content_base64`
4. **Done!** ✅

---

**Status:** Simple fix - just run the SQL migration!
**Next:** Copy SQL from `migrations/complete_file_upload_setup.sql` → Run in Supabase
