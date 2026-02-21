# 📸 Photo Upload System - Visual Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                     FORM SUBMISSION FLOW                           │
└─────────────────────────────────────────────────────────────────────┘

USER INTERFACE (Browser)
┌─────────────────────────┐
│  Fashion Form           │
│  - Item details         │
│  - Photos ⬅️ (📸 NEW)   │  
│  - Pricing              │
│  - Delivery info        │
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────────────────────┐
│   EnhancedFileUpload Component          │
│   - Validate file                       │
│   - Upload to storage                   │
│   - Save to form_file_uploads           │
│   - NEW: Save to form_submissions ⭐    │
└──────────┬──────────────────────────────┘
           │
           ├─────────────────────────────────────┐
           ▼                                     ▼
    ┌────────────────┐              ┌──────────────────────┐
    │ STORAGE        │              │ DATABASE             │
    │ form-uploads   │              │                      │
    │ bucket         │              │ form_file_uploads    │
    │                │              │ (individual files)   │
    │ Files:         │              │                      │
    │ - front.jpg    │              │ form_submissions     │
    │ - back.jpg     │              │ (organized by field) │
    │ - label.jpg    │              │                      │
    │ - etc...       │              │ uploaded_photos: {   │
    └────────────────┘              │   front_view: [...], │
                                    │   back_view: [...],  │
                                    │   brand_label: [...]│
                                    │ }                    │
                                    └──────────────────────┘
```

## Data Flow for File Upload

```
┌─────────────────────────────────────────────────────────────────────┐
│                      FILE UPLOAD SEQUENCE                          │
└─────────────────────────────────────────────────────────────────────┘

1. USER SELECTS FILE
   └─ SelectFiles button or Drag & Drop
   
2. COMPONENT RECEIVES FILE
   └─ handleFileUpload(fileList)
   
3. VALIDATION
   └─ Check: File type ✓
   └─ Check: File size ✓
   
4. UPLOAD TO STORAGE
   └─ supabase.storage.from('form-uploads').upload()
   └─ Location: form-uploads/{userId}/{transactionId}/{fieldName}/{timestamp}_{filename}
   
5. SAVE TO form_file_uploads TABLE
   └─ Record file metadata
   └─ Store: name, size, mime type, hash, timestamp
   
6. NEW ⭐ SAVE TO form_submissions TABLE
   └─ structurePhotoData(uploadedFiles)
   └─ savePhotosToFormSubmission()
   └─ uploaded_photos JSONB column updated
   
7. SUCCESS CALLBACK
   └─ onFilesUploaded() called
   └─ Component displays ✅ success
```

## Database Schema

```
┌──────────────────────────────────────────────────────────────────┐
│                    form_submissions TABLE                        │
├──────────────────────────────────────────────────────────────────┤
│ Column              │ Type      │ Description                   │
├─────────────────────┼───────────┼───────────────────────────────┤
│ id                  │ BIGINT    │ Primary key                   │
│ user_id             │ UUID      │ Form submitter                │
│ transaction_id      │ TEXT      │ Unique transaction            │
│ industry_category   │ TEXT      │ Product category              │
│ ...other fields...  │ VARIOUS   │ Form data                     │
│                     │           │                               │
│ uploaded_photos ⭐  │ JSONB     │ Photo metadata (NEW)          │
│                     │           │ Default: {}                   │
├──────────────────────────────────────────────────────────────────┤
│ Index: idx_form_submissions_uploaded_photos (GIN)               │
└──────────────────────────────────────────────────────────────────┘

JSONB Structure Example:
┌──────────────────────────────────────────────────────────────────┐
│ {                                                                │
│   "front_view_photo": [                                         │
│     {                                                            │
│       "field_name": "front_view_photo",                        │
│       "file_path": "form-uploads/.../front_view_photo/...",   │
│       "file_url": "https://supabase.../...",                  │
│       "file_size_bytes": 2500000,                             │
│       "mime_type": "image/jpeg",                              │
│       "file_hash_sha256": "abc123def456...",                  │
│       "uploaded_at": "2025-11-27T08:30:00Z",                 │
│       "processing_status": "uploaded"                          │
│     }                                                           │
│   ],                                                            │
│   "back_view_photo": [                                         │
│     { ...similar structure... }                                │
│   ],                                                            │
│   "brand_label_photo": [ ... ]                                │
│ }                                                               │
└──────────────────────────────────────────────────────────────────┘
```

## Storage Bucket Structure

```
form-uploads/ (Private bucket in Supabase Storage)
│
├─ user-123abc/                     ← User ID folder
│  │
│  ├─ transaction-xyz-789/          ← Transaction folder
│  │  │
│  │  ├─ front_view_photo/
│  │  │  ├─ 1701234567890_fashion-jacket.jpg
│  │  │  └─ 1701234567891_fashion-jacket.jpg
│  │  │
│  │  ├─ back_view_photo/
│  │  │  └─ 1701234567892_fashion-jacket.jpg
│  │  │
│  │  ├─ brand_label_photo/
│  │  │  └─ 1701234567893_label-closeup.jpg
│  │  │
│  │  ├─ defect_closeup_photos/
│  │  │  ├─ 1701234567894_stain.jpg
│  │  │  └─ 1701234567895_hole.jpg
│  │  │
│  │  ├─ fitting_demonstration_video/
│  │  │  └─ 1701234567896_fit-demo.mp4
│  │  │
│  │  └─ fabric_texture_photo/
│  │     └─ 1701234567897_texture-close.jpg
│  │
│  └─ transaction-abc-def/
│     └─ ...similar structure...
│
└─ user-456def/
   └─ ...similar structure...
```

## Component Architecture

```
┌──────────────────────────────────────────────────────────┐
│           EnhancedFileUpload Component                  │
├──────────────────────────────────────────────────────────┤
│                                                          │
│ PROPS:                                                  │
│ ├─ fieldName: string (e.g., "front_view_photo")        │
│ ├─ transactionId: string                               │
│ ├─ industryCategory: string                            │
│ ├─ onFilesUploaded: callback                           │
│ └─ existingFiles?: UploadedFile[]                      │
│                                                          │
│ STATE:                                                  │
│ ├─ uploadProgress: UploadProgress[]                    │
│ ├─ uploadedFiles: UploadedFile[]                       │
│ └─ isDragging: boolean                                 │
│                                                          │
│ METHODS:                                                │
│ ├─ uploadFile(file): Promise<UploadedFile> ⭐         │
│ ├─ handleFileUpload(files):                            │
│ │  ├─ Validate files                                   │
│ │  ├─ Upload each file                                 │
│ │  ├─ NEW: structurePhotoData()                       │
│ │  ├─ NEW: savePhotosToFormSubmission() ⭐            │
│ │  └─ Call onFilesUploaded callback                    │
│ ├─ handleDrop(e)                                       │
│ ├─ handleDragOver(e)                                   │
│ ├─ deleteFile(file)                                    │
│ └─ downloadFile(file)                                  │
│                                                          │
│ IMPORTS (NEW):                                          │
│ ├─ structurePhotoData                                  │
│ └─ savePhotosToFormSubmission                          │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

## Helper Functions

```
┌────────────────────────────────────────────────────────────────┐
│              addPhotosColumn.ts Utilities                      │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ 1. addPhotosColumnToFormSubmissions()                          │
│    └─ Migration function                                      │
│    └─ Adds uploaded_photos column if missing                  │
│    └─ Creates JSONB index                                     │
│                                                                │
│ 2. structurePhotoData(uploadedFiles)                           │
│    └─ Input: UploadedFile[]                                   │
│    └─ Output: { [fieldName]: UploadedFile[] }                │
│    └─ Groups files by field name                              │
│    └─ Formats for database storage                            │
│                                                                │
│ 3. savePhotosToFormSubmission(txId, userId, photoData)        │
│    └─ Gets existing photos from database                      │
│    └─ Merges with new photos                                  │
│    └─ Updates form_submissions.uploaded_photos                │
│    └─ Returns updated record                                  │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

## RLS Policy Configuration

```
┌──────────────────────────────────────────────────────────────┐
│              Supabase Storage RLS Policies                  │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ Table: storage.objects                                      │
│ Bucket: form-uploads                                        │
│                                                              │
│ POLICY 1: INSERT (Upload)                                   │
│ ├─ Name: "Users can upload files"                          │
│ ├─ Role: authenticated                                     │
│ └─ Expression:                                              │
│    bucket_id = 'form-uploads' AND                           │
│    (storage.foldername(name))[1] = auth.uid()::text       │
│                                                              │
│ POLICY 2: SELECT (Download)                                │
│ ├─ Name: "Users can read files"                            │
│ ├─ Role: authenticated                                     │
│ └─ Expression: (same as above)                              │
│                                                              │
│ POLICY 3: UPDATE (Replace)                                 │
│ ├─ Name: "Users can update files"                          │
│ ├─ Role: authenticated                                     │
│ └─ Expression: (same as above)                              │
│                                                              │
│ POLICY 4: DELETE (Remove)                                  │
│ ├─ Name: "Users can delete files"                          │
│ ├─ Role: authenticated                                     │
│ └─ Expression: (same as above)                              │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

## Testing Workflow

```
MANUAL TEST:

1. Setup Supabase
   └─ Create bucket: form-uploads
   └─ Add 4 RLS policies
   └─ Run SQL migration

2. Refresh Browser
   └─ Ctrl+Shift+R

3. Upload Photo
   └─ Select: Fashion & Apparel
   └─ Click: Upload Front View Photo
   └─ Select: JPG/PNG file
   └─ Wait: Upload completes

4. Verify in Database
   └─ Supabase SQL Editor
   └─ Query: SELECT uploaded_photos FROM form_submissions
   └─ Result: See photo metadata

5. Check Console
   └─ Press: F12
   └─ Look: "✅ Photos saved to form_submissions successfully"

SUCCESS ✅ if all steps complete without errors!
```

---

**Status**: Code implementation ✅ | Database setup ⏳ | Testing ⏳

