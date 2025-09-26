import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './use-auth';

export interface UserRole {
  id: string;
  user_id: string;
  role: 'admin' | 'moderator' | 'support' | 'user';
  created_at: string;
  updated_at: string;
}

export interface SecuritySettings {
  mfaEnabled: boolean;
  biometricEnabled: boolean;
  roles: UserRole[];
}

export const useSecurity = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState<SecuritySettings>({
    mfaEnabled: false,
    biometricEnabled: false,
    roles: []
  });
  const [loading, setLoading] = useState(false);

  const fetchUserRoles = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      setSettings(prev => ({
        ...prev,
        roles: data || []
      }));
    } catch (error) {
      console.error('Error fetching user roles:', error);
    }
  };

  const hasRole = (role: 'admin' | 'moderator' | 'support' | 'user'): boolean => {
    return settings.roles.some(userRole => userRole.role === role);
  };

  const assignRole = async (userId: string, role: 'admin' | 'moderator' | 'support' | 'user') => {
    if (!hasRole('admin')) {
      throw new Error('Only admins can assign roles');
    }

    try {
      const { error } = await supabase
        .from('user_roles')
        .insert({
          user_id: userId,
          role
        });
      
      if (error) throw error;
      
      // Refresh roles if we're updating current user
      if (userId === user?.id) {
        await fetchUserRoles();
      }
    } catch (error) {
      console.error('Error assigning role:', error);
      throw error;
    }
  };

  const removeRole = async (userId: string, role: 'admin' | 'moderator' | 'support' | 'user') => {
    if (!hasRole('admin')) {
      throw new Error('Only admins can remove roles');
    }

    try {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId)
        .eq('role', role);
      
      if (error) throw error;
      
      // Refresh roles if we're updating current user
      if (userId === user?.id) {
        await fetchUserRoles();
      }
    } catch (error) {
      console.error('Error removing role:', error);
      throw error;
    }
  };

  const enableMFA = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: 'totp'
      });
      
      if (error) throw error;
      
      setSettings(prev => ({ ...prev, mfaEnabled: true }));
      return { success: true, qrCode: data.totp.qr_code };
    } catch (error) {
      console.error('MFA enrollment error:', error);
      return { success: false, error: (error as Error).message };
    } finally {
      setLoading(false);
    }
  };

  const verifyMFA = async (code: string, factorId: string, challengeId: string) => {
    try {
      const { error } = await supabase.auth.mfa.verify({
        factorId,
        challengeId,
        code
      });
      
      if (error) throw error;
      
      return { success: true };
    } catch (error) {
      console.error('MFA verification error:', error);
      return { success: false, error: (error as Error).message };
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserRoles();
    }
  }, [user]);

  return {
    settings,
    loading,
    hasRole,
    assignRole,
    removeRole,
    enableMFA,
    verifyMFA,
    fetchUserRoles
  };
};