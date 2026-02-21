# ⚡ Quick Setup - Database-Only File Upload (5 Minutes)

## What Changed
Files now store in database instead of Supabase Storage bucket. **No bucket needed. No RLS policies needed.**

## What You Need to Do (ONE TIME)

### Step 1: Run SQL Migration (2 minutes)
```
1. Go to: https://app.supabase.com
2. Click your project
3. Left menu → SQL Editor
4. Click "New Query"
5. Copy-paste this SQL:
```

```sql
ALTER TABLE form_file_uploads
ADD COLUMN IF NOT EXISTS file_content_base64 TEXT;

ALTER TABLE form_file_uploads
DROP COLUMN IF EXISTS file_path CASCADE;

ALTER TABLE form_file_uploads
DROP COLUMN IF EXISTS file_url CASCADE;

CREATE INDEX IF NOT EXISTS idx_form_file_uploads_transaction_field 
ON form_file_uploads(transaction_id, field_name);
```

```
6. Click "Run" (green button)
7. Done! ✅
```

### Step 2: Test Upload (2 minutes)
```
1. Open http://localhost:3000 in browser
2. Go to any form (e.g., Fashion & Apparel)
3. Upload a photo
4. Should work immediately ✅
```

## That's It! 🎉

Files are now stored in database. Everything works automatically.

---

## Verification (Optional)

To verify files are in database:

1. Go to Supabase: https://app.supabase.com
2. Your project → Editor (left menu)
3. Click `form_file_uploads` table
4. You should see uploaded files with data in `file_content_base64` column

---

## If Something Goes Wrong

**Upload fails with "file_content_base64 not found":**
- SQL migration wasn't run
- Run the migration SQL from Step 1 above

**Upload succeeds but file doesn't appear:**
- Browser cache issue
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

**Other errors:**
- Check browser console (F12 → Console tab)
- Share the error message

---

## Key Points

✅ No Supabase Storage bucket needed
✅ No RLS policies needed  
✅ No additional configuration
✅ All files automatically stored in database
✅ Download/delete work from database
✅ Works offline (until next sync)
✅ Can switch to storage later if needed

---

**Status:** Ready to use after running SQL migration
**Time to complete:** ~5 minutes
