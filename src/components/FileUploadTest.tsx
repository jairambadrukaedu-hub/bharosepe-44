/**
 * FILE UPLOAD TEST PAGE
 * Test the comprehensive file upload system
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EnhancedFileUpload } from '@/components/EnhancedFileUpload';
import { setupStorageBuckets, testBucketAccess } from '@/utils/setupStorage';
import { supabase } from '@/integrations/supabase/client';

export const FileUploadTest = () => {
  const [setupStatus, setSetupStatus] = useState<'idle' | 'setting-up' | 'success' | 'error'>('idle');
  const [testResults, setTestResults] = useState<any[]>([]);

  const handleSetupStorage = async () => {
    setSetupStatus('setting-up');
    try {
      const success = await setupStorageBuckets();
      setSetupStatus(success ? 'success' : 'error');
    } catch (error) {
      console.error('Setup failed:', error);
      setSetupStatus('error');
    }
  };

  const handleTestAccess = async () => {
    try {
      const success = await testBucketAccess();
      setTestResults(prev => [...prev, {
        test: 'Bucket Access',
        result: success ? 'PASS' : 'FAIL',
        timestamp: new Date().toLocaleTimeString()
      }]);
    } catch (error) {
      setTestResults(prev => [...prev, {
        test: 'Bucket Access',
        result: 'ERROR',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toLocaleTimeString()
      }]);
    }
  };

  const testFileUploads = async () => {
    try {
      // Check if file upload table exists
      const { data, error } = await supabase
        .from('form_file_uploads')
        .select('*')
        .limit(1);

      setTestResults(prev => [...prev, {
        test: 'File Upload Table',
        result: error ? 'FAIL' : 'PASS',
        error: error?.message,
        timestamp: new Date().toLocaleTimeString()
      }]);
    } catch (error) {
      setTestResults(prev => [...prev, {
        test: 'File Upload Table',
        result: 'ERROR',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toLocaleTimeString()
      }]);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle>File Upload System Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <Button 
              onClick={handleSetupStorage}
              disabled={setupStatus === 'setting-up'}
              variant={setupStatus === 'success' ? 'default' : 'outline'}
            >
              {setupStatus === 'setting-up' ? 'Setting up...' : 'Setup Storage Bucket'}
            </Button>
            <Button onClick={handleTestAccess} variant="secondary">
              Test Bucket Access
            </Button>
            <Button onClick={testFileUploads} variant="secondary">
              Test Database Table
            </Button>
          </div>
          
          {setupStatus !== 'idle' && (
            <div>
              <Badge variant={
                setupStatus === 'success' ? 'default' :
                setupStatus === 'error' ? 'destructive' :
                'secondary'
              }>
                Storage Setup: {setupStatus.toUpperCase()}
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Test Results */}
      {testResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Test Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {testResults.map((result, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center space-x-3">
                    <Badge variant={
                      result.result === 'PASS' ? 'default' :
                      result.result === 'FAIL' ? 'destructive' :
                      'secondary'
                    }>
                      {result.result}
                    </Badge>
                    <span className="font-medium">{result.test}</span>
                    {result.error && (
                      <span className="text-sm text-red-600">({result.error})</span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">{result.timestamp}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* File Upload Test - Photos */}
      <Card>
        <CardHeader>
          <CardTitle>Test: Product Photos Upload</CardTitle>
        </CardHeader>
        <CardContent>
          <EnhancedFileUpload
            fieldName="condition_photos"
            transactionId="test-transaction-001"
            industryCategory="electronics"
            annexureCode="A"
            acceptedTypes="image/*,.png,.jpg,.jpeg"
            maxFileSize={10}
            multiple={true}
            onFilesUploaded={(files) => {
              console.log('✅ Photos uploaded:', files);
              setTestResults(prev => [...prev, {
                test: 'Photo Upload',
                result: 'SUCCESS',
                details: `${files.length} files uploaded`,
                timestamp: new Date().toLocaleTimeString()
              }]);
            }}
          />
        </CardContent>
      </Card>

      {/* File Upload Test - Videos */}
      <Card>
        <CardHeader>
          <CardTitle>Test: Working Demonstration Video</CardTitle>
        </CardHeader>
        <CardContent>
          <EnhancedFileUpload
            fieldName="working_demonstration_video"
            transactionId="test-transaction-001"
            industryCategory="electronics"
            annexureCode="A"
            acceptedTypes="video/*"
            maxFileSize={100}
            multiple={false}
            onFilesUploaded={(files) => {
              console.log('✅ Video uploaded:', files);
              setTestResults(prev => [...prev, {
                test: 'Video Upload',
                result: 'SUCCESS',
                details: `Video: ${files[0]?.originalFilename}`,
                timestamp: new Date().toLocaleTimeString()
              }]);
            }}
          />
        </CardContent>
      </Card>

      {/* File Upload Test - Documents */}
      <Card>
        <CardHeader>
          <CardTitle>Test: Certificate/Document Upload</CardTitle>
        </CardHeader>
        <CardContent>
          <EnhancedFileUpload
            fieldName="warranty_card_upload"
            transactionId="test-transaction-001"
            industryCategory="electronics"
            annexureCode="A"
            acceptedTypes=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            maxFileSize={50}
            multiple={false}
            onFilesUploaded={(files) => {
              console.log('✅ Document uploaded:', files);
              setTestResults(prev => [...prev, {
                test: 'Document Upload',
                result: 'SUCCESS',
                details: `Document: ${files[0]?.originalFilename}`,
                timestamp: new Date().toLocaleTimeString()
              }]);
            }}
          />
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Setup Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm space-y-2">
            <p><strong>1. Database Migration:</strong></p>
            <p className="text-gray-600 ml-4">Run the migration file: <code>20251126_create_file_storage_system.sql</code></p>
            
            <p><strong>2. Storage Bucket Setup:</strong></p>
            <p className="text-gray-600 ml-4">Click "Setup Storage Bucket" above, then manually add policies in Supabase Dashboard</p>
            
            <p><strong>3. Storage Policies (Manual Setup Required):</strong></p>
            <div className="text-gray-600 ml-4 space-y-1">
              <p>• Go to Supabase Dashboard → Storage → Policies</p>
              <p>• Add policies for: SELECT, INSERT, UPDATE, DELETE on 'objects' table</p>
              <p>• Policy condition: <code>bucket_id = 'form-uploads' AND name LIKE auth.uid() || '/%'</code></p>
            </div>
            
            <p><strong>4. Test the System:</strong></p>
            <p className="text-gray-600 ml-4">Upload different file types above to verify the complete file storage workflow</p>
          </div>
        </CardContent>
      </Card>
      
    </div>
  );
};

export default FileUploadTest;