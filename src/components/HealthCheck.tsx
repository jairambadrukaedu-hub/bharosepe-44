import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useProfile } from '@/hooks/use-profile';
import { supabase } from '@/integrations/supabase/client';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface HealthCheckItem {
  name: string;
  status: 'checking' | 'success' | 'error' | 'warning';
  message: string;
}

const HealthCheck = () => {
  const { user } = useAuth();
  const { profile } = useProfile();
  const [checks, setChecks] = useState<HealthCheckItem[]>([
    { name: 'Supabase Connection', status: 'checking', message: 'Testing connection...' },
    { name: 'Authentication', status: 'checking', message: 'Checking auth status...' },
    { name: 'Database Access', status: 'checking', message: 'Testing database...' },
    { name: 'Profile Access', status: 'checking', message: 'Checking profile...' },
  ]);

  useEffect(() => {
    runHealthChecks();
  }, [user, profile]);

  const runHealthChecks = async () => {
    const newChecks = [...checks];

    // Check 1: Supabase Connection
    try {
      const { data } = await supabase.from('profiles').select('count', { count: 'exact' }).limit(1);
      updateCheck(newChecks, 0, 'success', 'Connected successfully');
    } catch (error: any) {
      updateCheck(newChecks, 0, 'error', `Connection failed: ${error.message}`);
    }

    // Check 2: Authentication
    if (user) {
      updateCheck(newChecks, 1, 'success', `Authenticated as ${user.email}`);
    } else {
      updateCheck(newChecks, 1, 'warning', 'Not authenticated');
    }

    // Check 3: Database Access
    try {
      const { error } = await supabase.from('profiles').select('id').limit(1);
      if (error) {
        updateCheck(newChecks, 2, 'error', `Database error: ${error.message}`);
      } else {
        updateCheck(newChecks, 2, 'success', 'Database accessible');
      }
    } catch (error: any) {
      updateCheck(newChecks, 2, 'error', `Database failed: ${error.message}`);
    }

    // Check 4: Profile Access
    if (user) {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();
        
        if (error && error.code === 'PGRST116') {
          updateCheck(newChecks, 3, 'warning', 'No profile found (new user)');
        } else if (error) {
          updateCheck(newChecks, 3, 'error', `Profile error: ${error.message}`);
        } else if (data) {
          updateCheck(newChecks, 3, 'success', `Profile loaded: ${data.full_name || 'Unnamed'}`);
        }
      } catch (error: any) {
        updateCheck(newChecks, 3, 'error', `Profile failed: ${error.message}`);
      }
    } else {
      updateCheck(newChecks, 3, 'warning', 'No user to check profile for');
    }

    setChecks(newChecks);
  };

  const updateCheck = (checks: HealthCheckItem[], index: number, status: HealthCheckItem['status'], message: string) => {
    checks[index] = { ...checks[index], status, message };
  };

  const getStatusIcon = (status: HealthCheckItem['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return <div className="h-5 w-5 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />;
    }
  };

  const getStatusColor = (status: HealthCheckItem['status']) => {
    switch (status) {
      case 'success':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'error':
        return 'text-red-700 bg-red-50 border-red-200';
      case 'warning':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  // Only show in development mode
  if (!import.meta.env.DEV) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">System Health</h3>
        <button 
          onClick={runHealthChecks}
          className="text-xs text-blue-600 hover:text-blue-800"
        >
          Refresh
        </button>
      </div>
      
      <div className="space-y-2">
        {checks.map((check, index) => (
          <div key={index} className={`p-2 rounded border ${getStatusColor(check.status)}`}>
            <div className="flex items-center gap-2">
              {getStatusIcon(check.status)}
              <span className="font-medium text-sm">{check.name}</span>
            </div>
            <p className="text-xs mt-1 ml-7">{check.message}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 pt-3 border-t border-gray-200">
        <div className="text-xs text-gray-500">
          <div>User: {user ? user.email : 'Not logged in'}</div>
          <div>Profile: {profile ? profile.full_name || 'No name' : 'None'}</div>
          <div>Environment: {import.meta.env.MODE}</div>
        </div>
      </div>
    </div>
  );
};

export default HealthCheck;