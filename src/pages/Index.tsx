
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { useEffect } from 'react';

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Show landing page only for unauthenticated users
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-8 max-w-md px-6">
        <div>
          <h1 className="text-4xl font-bold mb-4 text-primary">Bharose Pe</h1>
          <p className="text-xl text-muted-foreground">Har Deal Mein Bharosa</p>
          <p className="text-sm text-muted-foreground mt-2">
            Secure transactions you can trust
          </p>
        </div>
        
        <div className="space-y-4">
          <Link to="/auth">
            <button className="bharose-primary-button w-full">
              Get Started
            </button>
          </Link>
          
          <Link to="/dashboard">
            <button className="bharose-secondary-button w-full">
              View Demo
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
