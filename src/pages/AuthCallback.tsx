import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { googleAuth } from '@/services/googleAuth';
import { toast } from 'sonner';
import LoadingSpinner from '@/components/LoadingSpinner';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        console.log('🔄 Processing OAuth callback...');
        
        // Check for error in URL params
        const error = searchParams.get('error');
        const errorDescription = searchParams.get('error_description');
        
        if (error) {
          console.error('❌ OAuth error from URL:', error, errorDescription);
          setStatus('error');
          setErrorMessage(errorDescription || error);
          toast.error('Authentication failed: ' + (errorDescription || error));
          
          setTimeout(() => navigate('/auth'), 3000);
          return;
        }

        // Handle successful OAuth callback
        const result = await googleAuth.handleCallback();
        
        if (result?.user) {
          console.log('✅ Authentication successful');
          setStatus('success');
          
          // Check if user needs to complete profile setup
          if (!result.profile || !result.profile.phone) {
            console.log('📝 Redirecting to profile setup...');
            toast.success('Welcome! Please complete your profile setup.');
            navigate('/profile-setup');
          } else {
            console.log('🏠 Redirecting to dashboard...');
            toast.success('Welcome back!');
            navigate('/dashboard');
          }
        } else {
          console.log('⚠️ No user session found');
          setStatus('error');
          setErrorMessage('No user session found');
          setTimeout(() => navigate('/auth'), 3000);
        }
      } catch (error: any) {
        console.error('❌ OAuth callback error:', error);
        setStatus('error');
        setErrorMessage(error.message || 'Authentication failed');
        toast.error('Authentication failed. Redirecting to login...');
        
        setTimeout(() => navigate('/auth'), 3000);
      }
    };

    handleCallback();
  }, [navigate, searchParams]);

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <div className="text-center">
            <LoadingSpinner />
            <h2 className="text-xl font-semibold mt-4 mb-2">Completing Sign In</h2>
            <p className="text-muted-foreground">
              Please wait while we complete your Google authentication...
            </p>
          </div>
        );

      case 'success':
        return (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2 text-green-600">Success!</h2>
            <p className="text-muted-foreground">
              You've been successfully signed in. Redirecting you now...
            </p>
          </div>
        );

      case 'error':
        return (
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2 text-red-600">Authentication Failed</h2>
            <p className="text-muted-foreground mb-4">
              {errorMessage || 'Something went wrong during authentication.'}
            </p>
            <p className="text-sm text-muted-foreground">
              Redirecting you back to login page...
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-bharose-primary mb-2">Bharose Pe</h1>
          <p className="text-muted-foreground">Authentication</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          {renderContent()}
        </div>

        {/* Debug info in development */}
        {import.meta.env.DEV && (
          <div className="mt-4 p-3 bg-gray-100 rounded text-xs text-gray-600">
            <p><strong>Debug Info:</strong></p>
            <p>Status: {status}</p>
            <p>Error: {errorMessage}</p>
            <p>URL Params: {searchParams.toString()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthCallback;