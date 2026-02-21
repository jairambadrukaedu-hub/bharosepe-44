# ⚡ Quick Action - Get Photo Uploads Working (15 min)

## Problem Fixed ✅
The SQL error was because you can't modify storage policies via SQL. Now split into two parts.

## Action 1: Run SQL (2 minutes) ✅ WILL WORK

```
1. Open: Supabase Dashboard
2. Go to: SQL Editor > New Query
3. Copy: /migrations/add_photos_column.sql
4. Paste: Into SQL editor
5. Click: Run
6. Result: See column_name, data_type, is_nullable results ✅
```

After this step, the `uploaded_photos` column is in your database.

## Action 2: Create Bucket (3 minutes)

```
1. Go to: Supabase Dashboard > Storage > Buckets
2. Click: "New bucket"
3. Enter:
   - Name: form-uploads
   - Public: OFF (toggle to make Private)
4. Click: "Create bucket"
```

After this step, you have a storage bucket ready.

## Action 3: Add 4 RLS Policies (10 minutes)

```
Go to: Supabase Dashboard > Authentication > Policies
Select table: storage.objects

POLICY 1 - Upload:
├─ Click "New Policy" > Select "For INSERT"
├─ Name: Users can upload to form-uploads bucket
├─ Roles: Check "authenticated"
├─ Expression: bucket_id = 'form-uploads' AND (storage.foldername(name))[1] = auth.uid()::text
├─ Click "Review" > "Save policy"

POLICY 2 - Download:
├─ Click "New Policy" > Select "For SELECT"
├─ Name: Users can read form-uploads bucket
├─ Roles: Check "authenticated"
├─ Expression: bucket_id = 'form-uploads' AND (storage.foldername(name))[1] = auth.uid()::text
├─ Click "Review" > "Save policy"

POLICY 3 - Update:
├─ Click "New Policy" > Select "For UPDATE"
├─ Name: Users can update form-uploads bucket
├─ Roles: Check "authenticated"
├─ Expression: bucket_id = 'form-uploads' AND (storage.foldername(name))[1] = auth.uid()::text
├─ Click "Review" > "Save policy"

POLICY 4 - Delete:
├─ Click "New Policy" > Select "For DELETE"
├─ Name: Users can delete form-uploads bucket
├─ Roles: Check "authenticated"
├─ Expression: bucket_id = 'form-uploads' AND (storage.foldername(name))[1] = auth.uid()::text
├─ Click "Review" > "Save policy"
```

## Test (1 minute)

```
1. Refresh: Ctrl+Shift+R
2. Select: Fashion & Apparel
3. Upload: A photo to Front View Photo field
4. Result: ✅ Should upload without errors!
5. Check: Supabase Dashboard > form_submissions table
6. See: uploaded_photos column has your photo metadata
```

## Done! 🎉

Photos now upload to your database automatically!

---

**See**: `CORRECTED_SETUP_PROCESS.md` for detailed guide
**Reference**: `SOLUTION_EXPLAINED.md` for understanding the fix

