/**
 * SUPABASE STORAGE BUCKET SETUP
 * Run this in the browser console to set up storage buckets and policies
 */

import { supabase } from '@/integrations/supabase/client';

export const setupStorageBuckets = async () => {
  console.log('🚀 Setting up Supabase storage buckets...');

  try {
    // Create the form-uploads bucket
    const { data: bucketData, error: bucketError } = await supabase.storage
      .createBucket('form-uploads', {
        public: false,
        fileSizeLimit: 52428800, // 50MB in bytes
        allowedMimeTypes: [
          // Images
          'image/jpeg',
          'image/jpg', 
          'image/png',
          'image/gif',
          'image/webp',
          'image/bmp',
          'image/tiff',
          // Videos
          'video/mp4',
          'video/avi',
          'video/mov',
          'video/wmv',
          'video/flv',
          'video/webm',
          'video/mkv',
          // Documents
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'application/vnd.ms-excel',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'text/plain',
          'text/csv',
          // Archives
          'application/zip',
          'application/x-rar-compressed'
        ]
      });

    if (bucketError && bucketError.message !== 'Bucket already exists') {
      throw bucketError;
    }

    console.log('✅ Bucket created or already exists:', bucketData);

    // Set up storage policies
    console.log('🔐 Setting up storage policies...');

    // Policy 1: Users can upload files to their own folders
    const uploadPolicy = {
      "role": "authenticated",
      "table": "objects",
      "action": "INSERT",
      "definition": {
        "bucket_id": "form-uploads",
        "name": {
          "_like": "concat(auth.uid(), '/%')"
        }
      }
    };

    // Policy 2: Users can read their own files
    const readPolicy = {
      "role": "authenticated", 
      "table": "objects",
      "action": "SELECT",
      "definition": {
        "bucket_id": "form-uploads",
        "name": {
          "_like": "concat(auth.uid(), '/%')"
        }
      }
    };

    // Policy 3: Users can update their own files
    const updatePolicy = {
      "role": "authenticated",
      "table": "objects", 
      "action": "UPDATE",
      "definition": {
        "bucket_id": "form-uploads",
        "name": {
          "_like": "concat(auth.uid(), '/%')"
        }
      }
    };

    // Policy 4: Users can delete their own files
    const deletePolicy = {
      "role": "authenticated",
      "table": "objects",
      "action": "DELETE", 
      "definition": {
        "bucket_id": "form-uploads",
        "name": {
          "_like": "concat(auth.uid(), '/%')"
        }
      }
    };

    console.log('📝 Storage policies configured (manual setup required in Supabase dashboard)');
    console.log('Please manually add these policies in Supabase Dashboard > Storage > Policies:');
    console.log('1. Upload Policy:', uploadPolicy);
    console.log('2. Read Policy:', readPolicy);
    console.log('3. Update Policy:', updatePolicy);
    console.log('4. Delete Policy:', deletePolicy);

    return true;

  } catch (error) {
    console.error('❌ Failed to set up storage:', error);
    return false;
  }
};

// Test function to verify bucket access
export const testBucketAccess = async () => {
  console.log('🧪 Testing bucket access...');

  try {
    // Test listing buckets
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      throw listError;
    }

    console.log('📋 Available buckets:', buckets);

    // Check if our bucket exists
    const formUploadsBucket = buckets.find(bucket => bucket.name === 'form-uploads');
    
    if (!formUploadsBucket) {
      console.log('⚠️ form-uploads bucket not found');
      return false;
    }

    console.log('✅ form-uploads bucket found:', formUploadsBucket);

    // Test uploading a small test file
    const testContent = 'This is a test file for form uploads';
    const testBlob = new Blob([testContent], { type: 'text/plain' });
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      console.log('⚠️ No authenticated user for testing');
      return false;
    }

    const testPath = `${user.id}/test-${Date.now()}.txt`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('form-uploads')
      .upload(testPath, testBlob);

    if (uploadError) {
      throw uploadError;
    }

    console.log('✅ Test upload successful:', uploadData);

    // Clean up test file
    const { error: deleteError } = await supabase.storage
      .from('form-uploads')
      .remove([testPath]);

    if (deleteError) {
      console.warn('⚠️ Could not delete test file:', deleteError);
    } else {
      console.log('🗑️ Test file cleaned up');
    }

    return true;

  } catch (error) {
    console.error('❌ Bucket access test failed:', error);
    return false;
  }
};

// Auto-run setup if this file is imported
if (typeof window !== 'undefined') {
  (window as any).setupStorageBuckets = setupStorageBuckets;
  (window as any).testBucketAccess = testBucketAccess;
}

export default { setupStorageBuckets, testBucketAccess };