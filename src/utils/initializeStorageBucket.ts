/**
 * AUTO-INITIALIZE STORAGE BUCKET
 * This runs on app startup to ensure the form-uploads bucket exists
 */

import { supabase } from '@/integrations/supabase/client';

export const initializeBucket = async (): Promise<boolean> => {
  try {
    console.log('🚀 Checking storage bucket...');

    // List existing buckets
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.warn('⚠️ Could not list buckets:', listError);
      return false;
    }

    // Check if form-uploads bucket exists
    const bucketExists = buckets?.some(b => b.name === 'form-uploads');
    
    if (bucketExists) {
      console.log('✅ Storage bucket "form-uploads" already exists');
      return true;
    }

    console.log('📦 Creating storage bucket "form-uploads"...');

    // Create the form-uploads bucket
    const { data: bucketData, error: bucketError } = await supabase.storage.createBucket(
      'form-uploads',
      {
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
          'video/quicktime',
          'video/webm',
          // Documents
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          // Common MIME types
          'application/octet-stream',
        ]
      }
    );

    if (bucketError && bucketError.message !== 'Bucket already exists') {
      console.error('❌ Failed to create bucket:', bucketError);
      return false;
    }

    console.log('✅ Storage bucket created successfully:', bucketData);
    return true;

  } catch (error) {
    console.error('❌ Error during bucket initialization:', error);
    return false;
  }
};

// Auto-initialize when module loads in browser
if (typeof window !== 'undefined') {
  // Delay initialization slightly to ensure Supabase client is ready
  setTimeout(() => {
    initializeBucket().catch(err => console.error('Initialization error:', err));
  }, 500);
}
