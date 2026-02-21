/**
 * ENHANCED FILE UPLOAD COMPONENT
 * Handles all types of file uploads for form submissions
 * Stores files directly in database (base64 encoded)
 */

import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { 
  Upload, 
  File, 
  Image, 
  Video, 
  FileText, 
  Camera, 
  Check, 
  X, 
  AlertCircle,
  Download,
  Eye
} from 'lucide-react';

interface FileUploadProps {
  fieldName: string;
  transactionId: string;
  industryCategory: string;
  annexureCode: string;
  acceptedTypes?: string;
  maxFileSize?: number; // in MB
  multiple?: boolean;
  onFilesUploaded?: (files: UploadedFile[]) => void;
  existingFiles?: UploadedFile[];
}

interface UploadedFile {
  id?: number;
  fieldName: string;
  originalFilename: string;
  filePath: string;
  fileUrl?: string;
  fileSizeBytes: number;
  mimeType: string;
  fileType: 'photo' | 'video' | 'document' | 'certificate' | 'screenshot' | 'audio';
  uploadedAt: string;
  processingStatus: 'uploading' | 'uploaded' | 'processing' | 'processed' | 'failed' | 'verified';
}

interface UploadProgress {
  fileName: string;
  progress: number;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  error?: string;
}

export const EnhancedFileUpload: React.FC<FileUploadProps> = ({
  fieldName,
  transactionId,
  industryCategory,
  annexureCode,
  acceptedTypes = "image/*,video/*,.pdf,.doc,.docx",
  maxFileSize = 50, // 50MB default
  multiple = true,
  onFilesUploaded,
  existingFiles = []
}) => {
  const [uploadProgress, setUploadProgress] = useState<UploadProgress[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>(existingFiles);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getFileType = (mimeType: string): UploadedFile['fileType'] => {
    if (mimeType.startsWith('image/')) return 'photo';
    if (mimeType.startsWith('video/')) return 'video';
    if (mimeType.startsWith('audio/')) return 'audio';
    if (mimeType.includes('pdf') || mimeType.includes('doc')) return 'document';
    if (mimeType.includes('certificate') || fieldName.includes('certificate')) return 'certificate';
    if (fieldName.includes('screenshot')) return 'screenshot';
    return 'document';
  };

  const getFileIcon = (fileType: UploadedFile['fileType']) => {
    switch (fileType) {
      case 'photo': return <Image className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'document': 
      case 'certificate': return <FileText className="h-4 w-4" />;
      case 'screenshot': return <Camera className="h-4 w-4" />;
      default: return <File className="h-4 w-4" />;
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > maxFileSize * 1024 * 1024) {
      return `File size must be less than ${maxFileSize}MB`;
    }

    // Check file type if specified and not wildcard
    if (acceptedTypes && acceptedTypes !== "*" && acceptedTypes !== "*/*") {
      const acceptedTypesArray = acceptedTypes.split(',').map(type => type.trim());
      const isAccepted = acceptedTypesArray.some(acceptedType => {
        if (acceptedType.startsWith('.')) {
          // File extension check
          return file.name.toLowerCase().endsWith(acceptedType.toLowerCase());
        } else if (acceptedType.includes('*')) {
          // MIME type wildcard check
          const baseType = acceptedType.split('/')[0];
          return file.type.startsWith(baseType);
        } else {
          // Exact MIME type check
          return file.type === acceptedType;
        }
      });

      if (!isAccepted) {
        return `File type not supported. Accepted types: ${acceptedTypes}`;
      }
    }

    return null;
  };

  const uploadFile = async (file: File): Promise<UploadedFile> => {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Convert file to base64 using chunked approach (avoids call stack overflow)
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    
    // Process in chunks to avoid stack overflow on large files
    let base64Data = '';
    const chunkSize = 65536; // 64KB chunks
    
    for (let i = 0; i < uint8Array.length; i += chunkSize) {
      const chunk = uint8Array.subarray(i, i + chunkSize);
      base64Data += String.fromCharCode.apply(null, Array.from(chunk));
    }
    
    base64Data = btoa(base64Data);

    // Generate file hash for integrity
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const fileHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // Get the form submission record - use limit(1) instead of single() to handle 0 or multiple results
    let { data: submissions, error: fetchError } = await supabase
      .from('form_submissions')
      .select('id, uploaded_images')
      .eq('transaction_id', transactionId)
      .limit(1);

    if (fetchError) {
      throw new Error(`Failed to fetch form submission: ${fetchError.message}`);
    }

    // If form submission doesn't exist, create it
    if (!submissions || submissions.length === 0) {
      console.log('📝 Creating form submission for transaction:', transactionId);
      
      // Build the insert object dynamically - only include fields that have values
      const insertData: any = {
        transaction_id: transactionId,
        user_id: user.id,
        industry_category: industryCategory,
        uploaded_images: {}
      };
      
      // Only add annexure_code if it's provided and not empty
      if (annexureCode && annexureCode.trim()) {
        insertData.annexure_code = annexureCode;
      }
      
      const { data: newSubmission, error: createError } = await supabase
        .from('form_submissions')
        .insert(insertData)
        .select()
        .limit(1);

      if (createError) {
        console.warn('⚠️ Could not create form submission:', createError);
        throw new Error(`Failed to create form submission: ${createError.message}`);
      }

      if (!newSubmission || newSubmission.length === 0) {
        throw new Error('Failed to create form submission');
      }

      submissions = newSubmission;
    }

    const formSubmission = submissions[0];

    // Prepare file object to store
    const fileObject = {
      filename: file.name,
      base64: base64Data,
      mimeType: file.type,
      size: file.size,
      hash: fileHash,
      uploadedAt: new Date().toISOString(),
      fieldName: fieldName
    };

    // Get existing images or start new object
    const uploadedImages = formSubmission.uploaded_images || {};
    
    // Add file to the appropriate field
    if (!uploadedImages[fieldName]) {
      uploadedImages[fieldName] = [];
    }
    
    uploadedImages[fieldName].push(fileObject);

    console.log('📤 Uploading file:', {
      filename: file.name,
      fieldName: fieldName,
      formSubmissionId: formSubmission.id
    });

    // Update form_submissions with new images
    const { data: updatedSubmission, error: updateError } = await supabase
      .from('form_submissions')
      .update({ uploaded_images: uploadedImages })
      .eq('id', formSubmission.id)
      .select()
      .limit(1);

    if (updateError) {
      throw new Error(`Failed to save file: ${updateError.message}`);
    }

    return {
      fieldName: fieldName,
      originalFilename: file.name,
      filePath: `form_submission/${formSubmission.id}/${fieldName}/${file.name}`,
      fileUrl: null,
      fileSizeBytes: file.size,
      mimeType: file.type,
      fileType: getFileType(file.type),
      uploadedAt: new Date().toISOString(),
      processingStatus: 'uploaded'
    };
  };

  const handleFileUpload = async (files: FileList) => {
    const filesToUpload = Array.from(files);
    
    // Validate all files first
    for (const file of filesToUpload) {
      const error = validateFile(file);
      if (error) {
        setUploadProgress(prev => [...prev, {
          fileName: file.name,
          progress: 0,
          status: 'error',
          error
        }]);
        return;
      }
    }

    // Initialize progress tracking
    const initialProgress = filesToUpload.map(file => ({
      fileName: file.name,
      progress: 0,
      status: 'uploading' as const
    }));
    setUploadProgress(initialProgress);

    const uploadedResults: UploadedFile[] = [];

    // Upload files sequentially to avoid overwhelming the system
    for (let i = 0; i < filesToUpload.length; i++) {
      const file = filesToUpload[i];
      
      try {
        // Update progress
        setUploadProgress(prev => 
          prev.map(p => 
            p.fileName === file.name 
              ? { ...p, progress: 25, status: 'uploading' }
              : p
          )
        );

        const uploadedFile = await uploadFile(file);
        uploadedResults.push(uploadedFile);

        // Update progress to completed
        setUploadProgress(prev => 
          prev.map(p => 
            p.fileName === file.name 
              ? { ...p, progress: 100, status: 'completed' }
              : p
          )
        );

      } catch (error: any) {
        console.error(`Failed to upload ${file.name}:`, error);
        setUploadProgress(prev => 
          prev.map(p => 
            p.fileName === file.name 
              ? { ...p, progress: 0, status: 'error', error: error.message }
              : p
          )
        );
      }
    }

    // Update uploaded files state
    setUploadedFiles(prev => [...prev, ...uploadedResults]);

    // Call callback if provided
    if (onFilesUploaded) {
      onFilesUploaded([...uploadedFiles, ...uploadedResults]);
    }

    // Clear progress after a short delay
    setTimeout(() => {
      setUploadProgress([]);
    }, 3000);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const deleteFile = async (file: UploadedFile) => {
    try {
      // Get the form submission record - use limit(1) instead of single()
      const { data: submissions, error: fetchError } = await supabase
        .from('form_submissions')
        .select('id, uploaded_images')
        .eq('transaction_id', transactionId)
        .limit(1);

      if (fetchError) {
        throw new Error(`Failed to fetch form submission: ${fetchError.message}`);
      }

      if (!submissions || submissions.length === 0) {
        throw new Error('Form submission not found');
      }

      const formSubmission = submissions[0];

      // Remove the file from uploaded_images
      const uploadedImages = formSubmission.uploaded_images || {};
      
      if (uploadedImages[fieldName]) {
        uploadedImages[fieldName] = uploadedImages[fieldName].filter(
          (f: any) => f.filename !== file.originalFilename
        );
        
        if (uploadedImages[fieldName].length === 0) {
          delete uploadedImages[fieldName];
        }
      }

      // Update form_submissions
      const { error: updateError } = await supabase
        .from('form_submissions')
        .update({ uploaded_images: uploadedImages })
        .eq('id', formSubmission.id);

      if (updateError) {
        throw new Error(`Failed to delete file: ${updateError.message}`);
      }

      // Update state
      setUploadedFiles(prev => prev.filter(f => f.originalFilename !== file.originalFilename));

    } catch (error: any) {
      console.error('Failed to delete file:', error);
    }
  };

  const downloadFile = async (file: UploadedFile) => {
    try {
      // Get the form submission record - use limit(1) instead of single()
      const { data: submissions, error: fetchError } = await supabase
        .from('form_submissions')
        .select('uploaded_images')
        .eq('transaction_id', transactionId)
        .limit(1);

      if (fetchError) {
        throw new Error(`Failed to fetch form submission: ${fetchError.message}`);
      }

      if (!submissions || submissions.length === 0) {
        throw new Error('Form submission not found');
      }

      // Find the file in uploaded_images
      const uploadedImages = submissions[0].uploaded_images || {};
      const fieldImages = uploadedImages[fieldName] || [];
      const fileData = fieldImages.find((f: any) => f.filename === file.originalFilename);

      if (!fileData || !fileData.base64) {
        throw new Error('File content not found in database');
      }

      // Convert base64 to blob using chunked approach
      const binaryString = atob(fileData.base64);
      const chunkSize = 65536; // 64KB chunks
      const chunks: BlobPart[] = [];
      
      for (let i = 0; i < binaryString.length; i += chunkSize) {
        const chunk = binaryString.slice(i, i + chunkSize);
        const bytes = new Uint8Array(chunk.length);
        for (let j = 0; j < chunk.length; j++) {
          bytes[j] = chunk.charCodeAt(j);
        }
        chunks.push(bytes as BlobPart);
      }
      
      const blob = new Blob(chunks, { type: file.mimeType });

      // Create download link
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.originalFilename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

    } catch (error: any) {
      console.error('Failed to download file:', error);
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <Card 
        className={`border-2 border-dashed transition-colors ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <CardContent className="p-6">
          <div className="text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4">
              <label htmlFor={`file-upload-${fieldName}`} className="cursor-pointer">
                <span className="mt-2 block text-sm font-medium text-gray-900">
                  Drop files here or click to upload
                </span>
                <span className="mt-1 block text-sm text-gray-500">
                  Accepted: {acceptedTypes} (max {maxFileSize}MB each)
                </span>
              </label>
              <input
                ref={fileInputRef}
                id={`file-upload-${fieldName}`}
                name={`file-upload-${fieldName}`}
                type="file"
                className="sr-only"
                multiple={multiple}
                accept={acceptedTypes}
                onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
              />
            </div>
            <Button
              type="button"
              variant="outline"
              className="mt-4"
              onClick={() => fileInputRef.current?.click()}
            >
              Select Files
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Upload Progress */}
      {uploadProgress.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <h4 className="text-sm font-medium mb-3">Uploading Files</h4>
            <div className="space-y-3">
              {uploadProgress.map((progress, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="truncate">{progress.fileName}</span>
                    <span>
                      {progress.status === 'error' ? (
                        <Badge variant="destructive">Error</Badge>
                      ) : progress.status === 'completed' ? (
                        <Badge variant="default">✓</Badge>
                      ) : (
                        <span>{progress.progress}%</span>
                      )}
                    </span>
                  </div>
                  {progress.status !== 'error' && (
                    <Progress value={progress.progress} className="mt-1" />
                  )}
                  {progress.error && (
                    <p className="text-xs text-red-600 mt-1">{progress.error}</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <h4 className="text-sm font-medium mb-3">
              Uploaded Files ({uploadedFiles.length})
            </h4>
            <div className="space-y-2">
              {uploadedFiles.map((file, index) => (
                <div key={file.id || index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    {getFileIcon(file.fileType)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {file.originalFilename}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(file.fileSizeBytes)} • {file.fileType}
                      </p>
                    </div>
                    <Badge 
                      variant={
                        file.processingStatus === 'processed' ? 'default' :
                        file.processingStatus === 'failed' ? 'destructive' :
                        'secondary'
                      }
                      className="text-xs"
                    >
                      {file.processingStatus}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2 ml-3">
                    {file.fileUrl && file.fileType === 'photo' && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => window.open(file.fileUrl, '_blank')}
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => downloadFile(file)}
                    >
                      <Download className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteFile(file)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnhancedFileUpload;