import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './use-auth';

export type UserRole = 'admin' | 'moderator' | 'support' | 'user';

interface UserRoleData {
  id: string;
  user_id: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export const useUserRoles = () => {
  const { user } = useAuth();
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserRoles = async () => {
    if (!user) {
      setRoles([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', user.id);

      if (fetchError) {
        console.error('Error fetching user roles:', fetchError);
        setError('Failed to fetch user roles');
        return;
      }

      const userRoles = data?.map((item: UserRoleData) => item.role) || [];
      setRoles(userRoles);
    } catch (err) {
      console.error('Error in fetchUserRoles:', err);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const hasRole = (role: UserRole): boolean => {
    return roles.includes(role);
  };

  const hasAnyRole = (checkRoles: UserRole[]): boolean => {
    return checkRoles.some(role => roles.includes(role));
  };

  const isAdmin = (): boolean => hasRole('admin');
  const isSupport = (): boolean => hasRole('support') || hasRole('admin');
  const isModerator = (): boolean => hasRole('moderator') || hasRole('admin');

  const addRole = async (role: UserRole): Promise<{ success: boolean; error?: string }> => {
    if (!user) {
      return { success: false, error: 'User not authenticated' };
    }

    try {
      const { error: insertError } = await supabase
        .from('user_roles')
        .insert({
          user_id: user.id,
          role: role
        });

      if (insertError) {
        console.error('Error adding role:', insertError);
        return { success: false, error: 'Failed to add role' };
      }

      await fetchUserRoles();
      return { success: true };
    } catch (err) {
      console.error('Error in addRole:', err);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const removeRole = async (role: UserRole): Promise<{ success: boolean; error?: string }> => {
    if (!user) {
      return { success: false, error: 'User not authenticated' };
    }

    try {
      const { error: deleteError } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', user.id)
        .eq('role', role);

      if (deleteError) {
        console.error('Error removing role:', deleteError);
        return { success: false, error: 'Failed to remove role' };
      }

      await fetchUserRoles();
      return { success: true };
    } catch (err) {
      console.error('Error in removeRole:', err);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  useEffect(() => {
    fetchUserRoles();
  }, [user]);

  return {
    roles,
    loading,
    error,
    hasRole,
    hasAnyRole,
    isAdmin,
    isSupport,
    isModerator,
    addRole,
    removeRole,
    refreshRoles: fetchUserRoles
  };
};