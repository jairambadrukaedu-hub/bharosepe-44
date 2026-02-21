# ⚡ Fix Upload Error - Setup Required

## The Issue
```
❌ Upload failed: Bucket not found
```

The storage bucket RLS policies aren't configured in Supabase.

## Quick Fix (5 Minutes)

### Step 1: Create Storage Bucket
1. Supabase Dashboard → **Storage** → **Buckets**
2. Click **"New bucket"**
3. Name: `form-uploads`
4. Toggle: **OFF** (Private bucket)
5. Click **Create**

### Step 2: Add Security Policies
1. Supabase Dashboard → **Authentication** → **Policies**
2. Select table: **`storage.objects`**
3. Click **"New Policy"** and add 4 policies:

**Policy 1 - Upload Permission**
- Name: `Users can upload files`
- Role: `authenticated`
- Expression:
```
bucket_id = 'form-uploads' AND (storage.foldername(name))[1] = auth.uid()::text
```

**Policy 2 - Download Permission**
- Name: `Users can read files`
- Role: `authenticated`
- Expression:
```
bucket_id = 'form-uploads' AND (storage.foldername(name))[1] = auth.uid()::text
```

**Policy 3 - Update Permission**
- Name: `Users can update files`
- Role: `authenticated`
- Expression:
```
bucket_id = 'form-uploads' AND (storage.foldername(name))[1] = auth.uid()::text
```

**Policy 4 - Delete Permission**
- Name: `Users can delete files`
- Role: `authenticated`
- Expression:
```
bucket_id = 'form-uploads' AND (storage.foldername(name))[1] = auth.uid()::text
```

### Step 3: Add Database Column
1. Supabase Dashboard → **SQL Editor** → **New Query**
2. Copy and paste from: `migrations/add_photos_column.sql`
3. Click **Run**

### Step 4: Test
1. Refresh browser: **Ctrl+Shift+R**
2. Select Fashion & Apparel
3. Upload a photo
4. ✅ Should work now!

## What Now Works
✅ Upload photos for forms
✅ Photos saved in database
✅ Multiple files per field
✅ Progress tracking
✅ File validation

## Files Modified
- ✅ Created: `src/utils/addPhotosColumn.ts`
- ✅ Updated: `src/components/EnhancedFileUpload.tsx`
- ✅ Created: `migrations/add_photos_column.sql`
- ✅ Created: `migrations/storage_bucket_rls_policies.sql`

## Database Changes
- New column: `uploaded_photos` in `form_submissions`
- Type: JSONB (stores file metadata)
- Indexed for fast queries

---

**Full setup guide**: See `PHOTOS_COLUMN_SETUP.md`

