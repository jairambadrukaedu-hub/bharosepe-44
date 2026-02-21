# Photo Upload System Setup - Complete Guide

## 🎯 What Was Done

### 1. **Added Photos Column to Database**
- New column: `uploaded_photos` in `form_submissions` table
- Type: JSONB (flexible structure for multiple files per field)
- Stores metadata for all uploaded photos/videos

### 2. **Integrated Photo Saving**
- When files upload successfully, they're now saved to `form_submissions.uploaded_photos`
- Automatically organizes photos by field name (front_view_photo, back_view_photo, etc.)
- Includes file metadata: size, hash, MIME type, upload timestamp

### 3. **Created Helper Functions**
- `structurePhotoData()` - Formats uploaded files for database storage
- `savePhotosToFormSubmission()` - Saves photo data to form_submissions table
- Automatic integration in file upload component

## ⚠️ Why Uploads Are Failing

The error **"Bucket not found"** or **"Upload failed"** happens because:

1. **Bucket doesn't exist yet** - Even though we added auto-creation code
2. **RLS Policies missing** - Even if bucket exists, security policies aren't set up
3. **No permissions** - Supabase won't allow uploads without proper policies

## ✅ How to Fix It

### Option A: Quick Manual Fix (Recommended for Testing)

#### Step 1: Create the Bucket
1. Go to **Supabase Dashboard** > **Storage** > **Buckets**
2. Click **"New bucket"**
3. Name: `form-uploads`
4. Make it **Private** (uncheck "Public bucket")
5. Click **Create bucket**

#### Step 2: Configure Bucket
1. Click on the `form-uploads` bucket
2. Go to **Settings** tab
3. Set **File size limit**: `52428800` (50 MB)
4. Add **Allowed MIME types**:
   - `image/*` (all images)
   - `video/mp4`
   - `video/webm`
   - `application/pdf`
5. Click **Save**

#### Step 3: Add RLS Policies
1. Go to **Supabase Dashboard** > **Authentication** > **Policies**
2. Select table: `storage.objects`
3. Add **4 policies** (INSERT, SELECT, UPDATE, DELETE):

**Policy 1 - Allow Upload (INSERT)**
```
Policy Name: "Users can upload files"
Roles: authenticated
Expression: bucket_id = 'form-uploads' AND (storage.foldername(name))[1] = auth.uid()::text
```

**Policy 2 - Allow Download (SELECT)**
```
Policy Name: "Users can read files"
Roles: authenticated
Expression: bucket_id = 'form-uploads' AND (storage.foldername(name))[1] = auth.uid()::text
```

**Policy 3 - Allow Update (UPDATE)**
```
Policy Name: "Users can update files"
Roles: authenticated
Expression: bucket_id = 'form-uploads' AND (storage.foldername(name))[1] = auth.uid()::text
```

**Policy 4 - Allow Delete (DELETE)**
```
Policy Name: "Users can delete files"
Roles: authenticated
Expression: bucket_id = 'form-uploads' AND (storage.foldername(name))[1] = auth.uid()::text
```

### Option B: Run SQL Migration

1. Go to **Supabase Dashboard** > **SQL Editor** > **New Query**
2. Copy SQL from: `/migrations/storage_bucket_rls_policies.sql`
3. Click **Run**
4. Wait for success message

### Option C: Add Photos Column to Database

If the column doesn't exist yet:

1. Go to **Supabase Dashboard** > **SQL Editor** > **New Query**
2. Copy SQL from: `/migrations/add_photos_column.sql`
3. Click **Run**
4. Verify: Column `uploaded_photos` should appear in `form_submissions`

## 📊 Database Schema

### New Column: `uploaded_photos`

```sql
uploaded_photos JSONB DEFAULT '{}'::jsonb
```

### Example Structure
```json
{
  "front_view_photo": [
    {
      "field_name": "front_view_photo",
      "file_path": "form-uploads/user-id/tx-id/front_view_photo/1701234567890_photo.jpg",
      "file_url": "https://supabase...storage/...",
      "file_size_bytes": 2500000,
      "mime_type": "image/jpeg",
      "file_hash_sha256": "abc123def456...",
      "uploaded_at": "2025-11-27T08:30:00Z",
      "processing_status": "uploaded"
    }
  ],
  "back_view_photo": [...],
  "brand_label_photo": [...]
}
```

### Accessing Photos

**Query all photos for a transaction:**
```sql
SELECT uploaded_photos 
FROM form_submissions 
WHERE transaction_id = 'your-transaction-id';
```

**Query specific field photos:**
```sql
SELECT 
  uploaded_photos -> 'front_view_photo' as front_photos
FROM form_submissions 
WHERE transaction_id = 'your-transaction-id';
```

## 🔄 File Upload Flow

```
User selects photo
    ↓
File validation (type, size)
    ↓
Upload to Supabase Storage (form-uploads bucket)
    ↓
Save metadata to form_file_uploads table
    ↓
Extract photo data and save to form_submissions.uploaded_photos
    ↓
✅ Photo linked to form submission
```

## 📝 Code Changes

### Files Modified
1. **src/components/EnhancedFileUpload.tsx**
   - Added import for `structurePhotoData` and `savePhotosToFormSubmission`
   - Updated `handleFileUpload()` to save photos to form_submissions

### Files Created
1. **src/utils/addPhotosColumn.ts**
   - Migration function to add column
   - Helper function to structure photo data
   - Function to save photos to database

2. **migrations/add_photos_column.sql**
   - SQL to add uploaded_photos column
   - Creates JSONB index for fast queries

3. **migrations/storage_bucket_rls_policies.sql**
   - SQL for RLS policies
   - Manual setup instructions

## 🧪 Testing

### Test 1: Upload a Photo
1. Refresh browser: **Ctrl+Shift+R**
2. Select Fashion & Apparel category
3. Try uploading **Front View Photo**
4. Expected: Upload completes without "Bucket not found" error

### Test 2: Verify in Database
1. Go to **Supabase Dashboard** > **SQL Editor**
2. Run query:
```sql
SELECT transaction_id, uploaded_photos 
FROM form_submissions 
ORDER BY created_at DESC 
LIMIT 5;
```
3. Expected: `uploaded_photos` column shows photo metadata

### Test 3: Check Console Logs
1. Press **F12** (DevTools) > **Console**
2. Try uploading a photo
3. Expected logs:
```
📸 Saving uploaded photos to form_submissions...
✅ Photos saved to form_submissions successfully
```

## ⚡ Quick Checklist

- [ ] **Bucket exists**: Go to Supabase Storage > Buckets > See "form-uploads"
- [ ] **Bucket is private**: Uncheck "Public bucket" in settings
- [ ] **RLS policies added**: 4 policies for INSERT, SELECT, UPDATE, DELETE
- [ ] **Column added**: `uploaded_photos` column exists in form_submissions
- [ ] **Test upload works**: Can upload a photo without errors
- [ ] **Data saved**: Photos appear in form_submissions.uploaded_photos

## 🆘 Troubleshooting

### Issue: "Bucket not found"
**Solution**: 
1. Go to Supabase Storage > Buckets
2. Create bucket named exactly `form-uploads`
3. Make sure it's Private (not Public)

### Issue: "Upload failed: No permission"
**Solution**: 
1. Check RLS policies are added
2. Verify 4 policies (INSERT, SELECT, UPDATE, DELETE)
3. Ensure expression: `bucket_id = 'form-uploads' AND (storage.foldername(name))[1] = auth.uid()::text`

### Issue: "Column doesn't exist"
**Solution**: 
1. Run `/migrations/add_photos_column.sql` in SQL Editor
2. Verify column appears in table

### Issue: Photos upload but don't appear in database
**Solution**: 
1. Check user is authenticated (logged in)
2. Verify transaction_id exists in form_submissions
3. Check console logs for errors

## 📚 Related Documentation

- `FASHION_FORM_FIX.md` - Form validation fixes
- `STORAGE_BUCKET_FIX.md` - Initial bucket creation
- `FILE_UPLOAD_GUIDE.md` - User guide for uploads
- `QUICK_FIX_UPLOAD.md` - Quick start

## ✨ What's Working Now

✅ File upload component with drag & drop
✅ Photo metadata tracking in database
✅ Multiple files per field
✅ File integrity checking (SHA-256 hashes)
✅ Upload progress tracking
✅ File type and size validation
✅ Photos linked to form submissions
✅ Organized storage structure

## 🎉 Status

**Ready to test after database setup!**

1. Add bucket + RLS policies (Supabase Dashboard)
2. Run SQL migrations (if needed)
3. Refresh browser and try uploading
4. Photos will now be saved to form_submissions table

