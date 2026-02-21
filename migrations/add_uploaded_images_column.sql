-- ============================================================================
-- MIGRATION: Add uploaded_images column to form_submissions table
-- ============================================================================
-- Run this SQL in Supabase SQL Editor to enable image storage in form_submissions
-- 
-- Purpose: Store all uploaded files (images, documents, etc.) directly in 
-- the form_submissions table as JSONB
-- ============================================================================

-- Step 1: Add uploaded_images column if it doesn't exist
ALTER TABLE public.form_submissions
ADD COLUMN IF NOT EXISTS uploaded_images JSONB DEFAULT '{}'::jsonb;

-- Step 2: Create index for faster queries on uploaded_images
CREATE INDEX IF NOT EXISTS idx_form_submissions_uploaded_images
ON public.form_submissions USING GIN(uploaded_images);

-- Step 3: Verify the column was added successfully
SELECT 
  column_name, 
  data_type, 
  is_nullable, 
  column_default
FROM information_schema.columns 
WHERE table_name = 'form_submissions' 
  AND table_schema = 'public'
  AND column_name = 'uploaded_images'
ORDER BY ordinal_position;

-- ============================================================================
-- SUCCESS!
-- ============================================================================
-- If you see the uploaded_images column above, the migration worked!
--
-- Column Details:
--   - Type: JSONB (flexible, indexed, searchable)
--   - Default: {} (empty object)
--   - Structure:
--     {
--       "front_view_photo": [
--         {
--           "filename": "photo.jpg",
--           "base64": "iVBORw0KGgo...",
--           "mimeType": "image/jpeg",
--           "size": 2097152,
--           "hash": "a1b2c3d4...",
--           "uploadedAt": "2025-11-27T20:24:50Z",
--           "fieldName": "front_view_photo"
--         }
--       ],
--       "back_view_photo": [...]
--     }
--
-- Usage:
--   ✅ Upload files - automatically stored in form_submissions.uploaded_images
--   ✅ Download files - retrieved from form_submissions
--   ✅ Delete files - removed from form_submissions
--   ✅ Query files - use JSONB operators
--
-- ============================================================================
