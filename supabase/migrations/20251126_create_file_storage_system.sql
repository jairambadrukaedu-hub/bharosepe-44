-- ===============================================================================
-- FILE STORAGE SYSTEM FOR FORM SUBMISSIONS
-- Handles all media files: photos, videos, documents, certificates
-- ===============================================================================

-- Create storage bucket policies and file upload table
CREATE TABLE IF NOT EXISTS form_file_uploads (
    -- Primary identifiers
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    transaction_id TEXT NOT NULL,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- File categorization
    field_name TEXT NOT NULL, -- e.g., 'condition_photos', 'serial_number_closeup', 'warranty_card_upload'
    industry_category TEXT NOT NULL,
    annexure_code TEXT NOT NULL,
    
    -- File metadata
    original_filename TEXT NOT NULL,
    file_path TEXT NOT NULL, -- Supabase storage path
    file_url TEXT, -- Public URL if applicable
    file_size_bytes BIGINT,
    mime_type TEXT,
    file_hash_sha256 TEXT, -- For integrity verification
    
    -- File type categorization
    file_type TEXT CHECK (file_type IN (
        'photo', 'video', 'document', 'certificate', 'screenshot', 'audio'
    )),
    
    -- Upload metadata
    uploaded_at TIMESTAMPTZ DEFAULT NOW(),
    upload_device_info JSONB, -- Device details, GPS, etc.
    
    -- Processing status
    processing_status TEXT DEFAULT 'uploaded' CHECK (processing_status IN (
        'uploading', 'uploaded', 'processing', 'processed', 'failed', 'verified'
    )),
    
    -- Content analysis (for fraud detection)
    is_analyzed BOOLEAN DEFAULT FALSE,
    analysis_result JSONB, -- AI analysis results
    
    -- Security flags
    is_tampered BOOLEAN DEFAULT FALSE,
    tamper_confidence DECIMAL(5,2),
    exif_data JSONB,
    
    -- Verification by other party
    verified_by_buyer BOOLEAN DEFAULT FALSE,
    verified_by_seller BOOLEAN DEFAULT FALSE,
    verification_notes TEXT,
    
    CONSTRAINT fk_form_files_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_form_files_transaction_id ON form_file_uploads(transaction_id);
CREATE INDEX IF NOT EXISTS idx_form_files_user_id ON form_file_uploads(user_id);
CREATE INDEX IF NOT EXISTS idx_form_files_field_name ON form_file_uploads(field_name);
CREATE INDEX IF NOT EXISTS idx_form_files_industry ON form_file_uploads(industry_category);
CREATE INDEX IF NOT EXISTS idx_form_files_type ON form_file_uploads(file_type);
CREATE INDEX IF NOT EXISTS idx_form_files_uploaded_at ON form_file_uploads(uploaded_at DESC);

-- Row Level Security
ALTER TABLE form_file_uploads ENABLE ROW LEVEL SECURITY;

-- Users can only access their own files
CREATE POLICY "Users can view their own files"
    ON form_file_uploads FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own files"
    ON form_file_uploads FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own files"
    ON form_file_uploads FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own files"
    ON form_file_uploads FOR DELETE
    USING (auth.uid() = user_id);

-- ===============================================================================
-- STORAGE BUCKET SETUP (Run these in Supabase Dashboard or via API)
-- ===============================================================================

-- Note: These need to be run in Supabase Dashboard Storage section or via API
-- 
-- Bucket: 'form-uploads'
-- Public: false (files are private by default)
-- Allowed MIME types: image/*, video/*, application/pdf, application/msword, etc.
-- File size limit: 50MB per file
-- 
-- Bucket policies:
-- 1. Users can upload to their own folders: {user_id}/{transaction_id}/*
-- 2. Users can read their own files
-- 3. Files are automatically organized by transaction and field type

-- ===============================================================================
-- HELPER FUNCTIONS
-- ===============================================================================

-- Function to get all files for a transaction
CREATE OR REPLACE FUNCTION get_transaction_files(
    p_transaction_id TEXT
)
RETURNS SETOF form_file_uploads AS $$
BEGIN
    RETURN QUERY
    SELECT * FROM form_file_uploads
    WHERE transaction_id = p_transaction_id
    AND user_id = auth.uid()
    ORDER BY field_name, uploaded_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get files by field name
CREATE OR REPLACE FUNCTION get_field_files(
    p_transaction_id TEXT,
    p_field_name TEXT
)
RETURNS SETOF form_file_uploads AS $$
BEGIN
    RETURN QUERY
    SELECT * FROM form_file_uploads
    WHERE transaction_id = p_transaction_id
    AND field_name = p_field_name
    AND user_id = auth.uid()
    ORDER BY uploaded_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to calculate total storage used by user
CREATE OR REPLACE FUNCTION get_user_storage_usage(
    p_user_id UUID DEFAULT auth.uid()
)
RETURNS BIGINT AS $$
BEGIN
    RETURN COALESCE((
        SELECT SUM(file_size_bytes)
        FROM form_file_uploads
        WHERE user_id = p_user_id
    ), 0);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to clean up orphaned files (files without corresponding form submissions)
CREATE OR REPLACE FUNCTION cleanup_orphaned_files()
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER := 0;
BEGIN
    -- Mark files as orphaned if their transaction doesn't exist in contracts table
    UPDATE form_file_uploads 
    SET processing_status = 'failed'
    WHERE transaction_id NOT IN (
        SELECT DISTINCT transaction_id 
        FROM contracts 
        WHERE transaction_id IS NOT NULL
    )
    AND processing_status != 'failed';
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ===============================================================================
-- TRIGGERS
-- ===============================================================================

-- Trigger to update file count in form submissions
CREATE OR REPLACE FUNCTION update_file_count_trigger()
RETURNS TRIGGER AS $$
BEGIN
    -- This would update a file_count field if we add it to form_submissions table
    -- For now, we'll just log the change
    
    -- Update the media_files JSONB in form_submissions table
    -- This keeps track of all uploaded files per transaction
    IF TG_OP = 'INSERT' THEN
        -- Add new file reference to media_files JSONB
        UPDATE contracts 
        SET contract_data = COALESCE(contract_data, '{}')::jsonb || 
            jsonb_build_object('uploaded_files', 
                COALESCE(contract_data->'uploaded_files', '[]')::jsonb || 
                jsonb_build_array(jsonb_build_object(
                    'field_name', NEW.field_name,
                    'file_path', NEW.file_path,
                    'uploaded_at', NEW.uploaded_at
                ))
            )
        WHERE transaction_id = NEW.transaction_id;
    END IF;
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER form_file_upload_trigger
    AFTER INSERT OR UPDATE OR DELETE ON form_file_uploads
    FOR EACH ROW
    EXECUTE FUNCTION update_file_count_trigger();

-- ===============================================================================
-- FILE ANALYSIS FUNCTIONS (For future AI integration)
-- ===============================================================================

-- Function to mark file for analysis
CREATE OR REPLACE FUNCTION mark_file_for_analysis(
    p_file_id BIGINT,
    p_analysis_type TEXT DEFAULT 'basic'
)
RETURNS BOOLEAN AS $$
BEGIN
    UPDATE form_file_uploads
    SET analysis_result = jsonb_build_object(
        'analysis_type', p_analysis_type,
        'queued_at', NOW(),
        'status', 'queued'
    )
    WHERE id = p_file_id
    AND user_id = auth.uid();
    
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to store analysis results
CREATE OR REPLACE FUNCTION store_analysis_result(
    p_file_id BIGINT,
    p_result JSONB
)
RETURNS BOOLEAN AS $$
BEGIN
    UPDATE form_file_uploads
    SET 
        is_analyzed = TRUE,
        analysis_result = p_result,
        processing_status = CASE 
            WHEN p_result->>'is_valid' = 'true' THEN 'processed'
            ELSE 'failed'
        END
    WHERE id = p_file_id;
    
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ===============================================================================
-- VIEW FOR FILE SUMMARY
-- ===============================================================================

CREATE OR REPLACE VIEW v_transaction_files AS
SELECT 
    transaction_id,
    user_id,
    industry_category,
    COUNT(*) as total_files,
    COUNT(CASE WHEN file_type = 'photo' THEN 1 END) as photo_count,
    COUNT(CASE WHEN file_type = 'video' THEN 1 END) as video_count,
    COUNT(CASE WHEN file_type = 'document' THEN 1 END) as document_count,
    SUM(file_size_bytes) as total_size_bytes,
    COUNT(CASE WHEN verified_by_buyer = TRUE THEN 1 END) as verified_by_buyer_count,
    COUNT(CASE WHEN verified_by_seller = TRUE THEN 1 END) as verified_by_seller_count,
    COUNT(CASE WHEN is_analyzed = TRUE THEN 1 END) as analyzed_count,
    MAX(uploaded_at) as last_upload_at
FROM form_file_uploads
GROUP BY transaction_id, user_id, industry_category;

-- ===============================================================================
-- COMMENTS FOR DOCUMENTATION
-- ===============================================================================

COMMENT ON TABLE form_file_uploads IS 'Stores all file uploads for form submissions including photos, videos, documents and certificates';
COMMENT ON COLUMN form_file_uploads.field_name IS 'Form field name this file belongs to (e.g., condition_photos, serial_number_closeup)';
COMMENT ON COLUMN form_file_uploads.file_path IS 'Path in Supabase storage bucket';
COMMENT ON COLUMN form_file_uploads.analysis_result IS 'AI analysis results for fraud detection and content verification';
COMMENT ON COLUMN form_file_uploads.exif_data IS 'Camera metadata and GPS information for authenticity verification';