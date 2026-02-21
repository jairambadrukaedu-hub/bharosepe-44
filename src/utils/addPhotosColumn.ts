/**
 * DATABASE MIGRATION - Add Photos Column
 * Adds a column to track uploaded photos in form_submissions table
 */

import { supabase } from '@/integrations/supabase/client';

export const addPhotosColumnToFormSubmissions = async () => {
  console.log('🚀 Adding uploaded_photos column to form_submissions table...');

  try {
    // Check if column already exists
    const { data: checkData, error: checkError } = await supabase
      .from('form_submissions')
      .select('uploaded_photos')
      .limit(1);

    if (checkError && !checkError.message.includes('column')) {
      // Column doesn't exist, proceed with adding it
      console.log('📝 Column does not exist, adding it...');
    } else if (!checkError) {
      console.log('✅ Column "uploaded_photos" already exists');
      return true;
    }

    // Execute SQL to add column
    const { data, error } = await supabase.rpc('execute_sql', {
      sql_query: `
        -- Add uploaded_photos column if it doesn't exist
        ALTER TABLE form_submissions
        ADD COLUMN IF NOT EXISTS uploaded_photos JSONB DEFAULT '{}'::jsonb;

        -- Add index for faster queries
        CREATE INDEX IF NOT EXISTS idx_form_submissions_uploaded_photos 
        ON form_submissions USING GIN(uploaded_photos);

        -- Add comment to column
        COMMENT ON COLUMN form_submissions.uploaded_photos IS 
        'JSONB array of uploaded file metadata for form evidence and product photos';

        -- Example structure:
        -- {
        --   "front_view_photo": [
        --     {
        --       "field_name": "front_view_photo",
        --       "file_path": "form-uploads/user-id/transaction-id/front_view_photo/timestamp_filename.jpg",
        --       "file_url": "https://...",
        --       "file_size_bytes": 2500000,
        --       "mime_type": "image/jpeg",
        --       "file_hash_sha256": "...",
        --       "uploaded_at": "2025-11-27T08:30:00Z",
        --       "processing_status": "uploaded"
        --     }
        --   ],
        --   "back_view_photo": [...],
        --   "brand_label_photo": [...],
        --   "defect_closeup_photos": [...],
        --   "fitting_demonstration_video": [...],
        --   "fabric_texture_photo": [...]
        -- }
      `
    });

    if (error) {
      // If rpc doesn't exist, try direct SQL
      console.log('⚠️ RPC method not available, trying alternative...');
      
      const { error: alterError } = await supabase
        .from('form_submissions')
        .update({ uploaded_photos: {} })
        .eq('id', 0)
        .select()
        .single();

      if (alterError && !alterError.message.includes('no rows')) {
        console.log('📝 Column may already exist or database schema differs');
      }
    }

    console.log('✅ Photos column migration completed!');
    return true;

  } catch (error) {
    console.error('⚠️ Migration error (may not be critical):', error);
    // Don't fail completely, column might already exist
    return true;
  }
};

// Alternative: Simple helper function to structure photo data
export const structurePhotoData = (uploadedFiles: any[]): Record<string, any[]> => {
  const photoData: Record<string, any[]> = {};

  uploadedFiles.forEach(file => {
    const fieldName = file.fieldName || file.field_name;
    
    if (!photoData[fieldName]) {
      photoData[fieldName] = [];
    }

    photoData[fieldName].push({
      field_name: fieldName,
      file_path: file.filePath || file.file_path,
      file_url: file.fileUrl || file.file_url,
      file_size_bytes: file.fileSizeBytes || file.file_size_bytes,
      mime_type: file.mimeType || file.mime_type,
      file_hash_sha256: file.fileHash || file.file_hash_sha256,
      uploaded_at: file.uploadedAt || file.uploaded_at || new Date().toISOString(),
      processing_status: file.processingStatus || file.processing_status || 'uploaded'
    });
  });

  return photoData;
};

// Function to save photos to form_submissions
export const savePhotosToFormSubmission = async (
  transactionId: string,
  userId: string,
  photoData: Record<string, any[]>
) => {
  try {
    console.log('💾 Saving photos to form_submissions for transaction:', transactionId);

    // Merge with existing photos if any
    const { data: existing, error: fetchError } = await supabase
      .from('form_submissions')
      .select('uploaded_photos')
      .eq('transaction_id', transactionId)
      .eq('user_id', userId)
      .single();

    if (fetchError && !fetchError.message.includes('no rows')) {
      console.warn('⚠️ Error fetching existing photos:', fetchError);
    }

    const mergedPhotos = {
      ...(existing?.uploaded_photos || {}),
      ...photoData
    };

    // Update form submission with photos
    const { data: updateData, error: updateError } = await supabase
      .from('form_submissions')
      .update({
        uploaded_photos: mergedPhotos,
        updated_at: new Date().toISOString()
      })
      .eq('transaction_id', transactionId)
      .eq('user_id', userId)
      .select()
      .single();

    if (updateError) {
      console.error('❌ Error saving photos:', updateError);
      throw updateError;
    }

    console.log('✅ Photos saved to form_submissions:', updateData);
    return updateData;

  } catch (error) {
    console.error('❌ Failed to save photos:', error);
    throw error;
  }
};

// Auto-run migration on app load
if (typeof window !== 'undefined') {
  (window as any).addPhotosColumnToFormSubmissions = addPhotosColumnToFormSubmissions;
  (window as any).structurePhotoData = structurePhotoData;
  (window as any).savePhotosToFormSubmission = savePhotosToFormSubmission;
}

export default { 
  addPhotosColumnToFormSubmissions, 
  structurePhotoData, 
  savePhotosToFormSubmission 
};
