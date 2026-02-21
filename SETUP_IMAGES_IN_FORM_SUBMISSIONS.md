# ✅ Store Images in form_submissions - Quick Setup (2 Minutes)

## What Changed

Images are now stored directly in the `form_submissions` table (not in a separate table).

✅ Simpler structure
✅ One table per form submission
✅ All data together

## Setup (ONE TIME - 2 Minutes)

### Step 1: Run Migration SQL (1 min)

1. Go to: https://app.supabase.com
2. Your project → SQL Editor
3. Click "New Query"
4. Copy all SQL from:
   ```
   migrations/add_uploaded_images_column.sql
   ```
5. Paste in SQL Editor
6. Click "Run" (green button)

**What this does:**
- ✅ Adds `uploaded_images` JSONB column to `form_submissions`
- ✅ Creates index for fast queries
- ✅ Ready to store files

### Step 2: Test Upload (1 min)

1. Refresh browser: http://localhost:3000
2. Go to any form (e.g., Fashion & Apparel)
3. Upload a file
4. Should work now ✅

---

## How It Works

### Upload
```
1. User uploads file
2. File converted to Base64
3. Stored in form_submissions.uploaded_images JSONB column
4. Complete! One database write operation.
```

### Structure
```json
{
  "front_view_photo": [
    {
      "filename": "photo.jpg",
      "base64": "iVBORw0KGgo...",
      "mimeType": "image/jpeg",
      "size": 2097152,
      "hash": "a1b2c3d4...",
      "uploadedAt": "2025-11-27T20:24:50Z",
      "fieldName": "front_view_photo"
    }
  ],
  "back_view_photo": [...]
}
```

### Download
```
1. User clicks download
2. File retrieved from form_submissions.uploaded_images
3. Base64 decoded to binary
4. Browser downloads file
```

### Delete
```
1. User clicks delete
2. File removed from form_submissions.uploaded_images
3. form_submissions updated
4. Done!
```

---

## Benefits

✅ **All data in one place** - Form + images together
✅ **Atomic operations** - Form + images save together
✅ **Simple queries** - No joins needed
✅ **Easy backups** - Everything in form_submissions backups
✅ **No separate table** - Less complexity

---

**Status:** Ready to use after running SQL migration
**Time:** ~2 minutes to setup
**Next:** Copy SQL and run in Supabase
