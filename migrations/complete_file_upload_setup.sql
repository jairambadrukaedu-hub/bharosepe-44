-- ============================================================================
-- COMPLETE SETUP: Create form_file_uploads table and enable file storage
-- ============================================================================
-- Run this SQL in Supabase SQL Editor to set up the complete file upload system
-- 
-- This creates the table from scratch and adds proper RLS policies
-- ============================================================================

-- ============================================================================
-- STEP 1: Create form_file_uploads table
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.form_file_uploads (
  id BIGSERIAL PRIMARY KEY,
  
  -- Foreign keys (references)
  transaction_id UUID NOT NULL REFERENCES public.transactions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- File metadata
  field_name TEXT NOT NULL,
  industry_category TEXT NOT NULL,
  annexure_code TEXT,
  original_filename TEXT NOT NULL,
  
  -- File content (Base64 encoded - stores complete file)
  file_content_base64 TEXT NOT NULL,
  
  -- File details
  file_size_bytes INTEGER NOT NULL,
  mime_type TEXT NOT NULL,
  file_hash_sha256 TEXT,
  file_type TEXT,
  
  -- Status tracking
  processing_status TEXT DEFAULT 'uploaded',
  upload_device_info JSONB,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Indexes
  CONSTRAINT fk_transaction FOREIGN KEY (transaction_id) REFERENCES public.transactions(id) ON DELETE CASCADE,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- ============================================================================
-- STEP 2: Create indexes for faster queries
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_form_file_uploads_transaction_id 
  ON public.form_file_uploads(transaction_id);

CREATE INDEX IF NOT EXISTS idx_form_file_uploads_user_id 
  ON public.form_file_uploads(user_id);

CREATE INDEX IF NOT EXISTS idx_form_file_uploads_field_name 
  ON public.form_file_uploads(field_name);

CREATE INDEX IF NOT EXISTS idx_form_file_uploads_transaction_field 
  ON public.form_file_uploads(transaction_id, field_name);

CREATE INDEX IF NOT EXISTS idx_form_file_uploads_uploaded_at 
  ON public.form_file_uploads(uploaded_at);

-- ============================================================================
-- STEP 3: Enable RLS (Row Level Security)
-- ============================================================================
ALTER TABLE public.form_file_uploads ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- STEP 4: Create RLS Policies
-- ============================================================================

-- Policy 1: Users can INSERT their own files
CREATE POLICY "Users can insert their own files"
  ON public.form_file_uploads
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy 2: Users can SELECT their own files
CREATE POLICY "Users can select their own files"
  ON public.form_file_uploads
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy 3: Users can UPDATE their own files
CREATE POLICY "Users can update their own files"
  ON public.form_file_uploads
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy 4: Users can DELETE their own files
CREATE POLICY "Users can delete their own files"
  ON public.form_file_uploads
  FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================================
-- STEP 5: Create updated_at trigger
-- ============================================================================
CREATE OR REPLACE FUNCTION public.update_updated_at_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_form_file_uploads_updated_at ON public.form_file_uploads;

CREATE TRIGGER update_form_file_uploads_updated_at
  BEFORE UPDATE ON public.form_file_uploads
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_timestamp();

-- ============================================================================
-- STEP 6: Verify table creation
-- ============================================================================
SELECT 
  tablename,
  (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = tablename) as column_count
FROM pg_tables
WHERE tablename = 'form_file_uploads' AND schemaname = 'public';

-- Verify columns
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'form_file_uploads' 
  AND table_schema = 'public'
ORDER BY ordinal_position;

-- ============================================================================
-- STEP 7: Verify RLS policies
-- ============================================================================
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'form_file_uploads' AND schemaname = 'public';

-- ============================================================================
-- SUCCESS!
-- ============================================================================
-- The form_file_uploads table is now ready!
-- 
-- What was created:
--   ✅ Table: form_file_uploads with proper schema
--   ✅ Columns: All required fields including file_content_base64
--   ✅ Indexes: 5 indexes for optimal performance
--   ✅ RLS: 4 policies for user data isolation
--   ✅ Trigger: Auto-update timestamp on modification
--
-- You can now:
--   ✅ Upload files (stored as base64)
--   ✅ Download files
--   ✅ Delete files
--   ✅ Query file history
--
-- ============================================================================
