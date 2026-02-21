-- ============================================================================
-- DATABASE MIGRATION: Add File Storage Columns
-- ============================================================================
-- Run this SQL in Supabase SQL Editor to enable database-based file storage
-- 
-- Purpose: Store uploaded files as base64 directly in database
-- Location: Copy this SQL and run in Supabase Dashboard > SQL Editor > New Query
-- ============================================================================

-- Step 1: Add file_content_base64 column to form_file_uploads if it doesn't exist
ALTER TABLE form_file_uploads
ADD COLUMN IF NOT EXISTS file_content_base64 TEXT;

-- Step 2: Drop the old file_path and file_url columns if they exist (no longer needed)
ALTER TABLE form_file_uploads
DROP COLUMN IF EXISTS file_path CASCADE;

ALTER TABLE form_file_uploads
DROP COLUMN IF EXISTS file_url CASCADE;

-- Step 3: Create index for faster queries on the file lookup
CREATE INDEX IF NOT EXISTS idx_form_file_uploads_transaction_field 
ON form_file_uploads(transaction_id, field_name);

-- Step 4: Verify the columns were updated successfully
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'form_file_uploads'
ORDER BY ordinal_position;

-- ============================================================================
-- SUCCESS!
-- If you see file_content_base64 column in the output above, the migration worked!
--
-- KEY CHANGES:
-- - Files are now stored as base64 TEXT in the database
-- - No Supabase storage bucket needed
-- - No storage RLS policies needed
-- - All files stored in form_file_uploads table
-- - Simple and dependency-free!
-- ============================================================================
