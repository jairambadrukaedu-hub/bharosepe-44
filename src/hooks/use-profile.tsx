import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/use-auth';
import { toast } from 'sonner';

export interface UserProfile {
  id: string;
  user_id: string;
  full_name?: string;
  phone?: string;
  role?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    if (!user) {
      console.log('useProfile - No user, skipping profile fetch');
      return;
    }

    console.log('useProfile - Fetching profile for user:', user.id);

    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      console.log('useProfile - Fetch result:', { data, error });

      if (error && error.code !== 'PGRST116') {
        console.error('useProfile - Error fetching profile:', error);
        // Only show error toast if it's not a "no rows returned" error
        if (error.code !== 'PGRST116') {
          toast.error('Failed to load profile');
        }
      } else {
        console.log('useProfile - Setting profile data:', data);
        setProfile(data);
      }
    } catch (error: any) {
      console.error('useProfile - Error fetching profile:', error);
      // Don't show toast error for missing profile - it's normal for new users
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: {
    full_name?: string;
    phone?: string;
    role?: string;
    avatar_url?: string;
  }) => {
    if (!user) throw new Error('User not authenticated');

    try {
      // Validate phone number if provided
      if (updates.phone) {
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(updates.phone.replace(/\D/g, ''))) {
          throw new Error('Please enter a valid 10-digit phone number');
        }
      }

      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;

      setProfile(data);
      toast.success('Profile updated successfully');
      return data;
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error(error.message || 'Failed to update profile');
      throw error;
    }
  };

  const updateEmail = async (newEmail: string) => {
    if (!user) throw new Error('User not authenticated');

    try {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(newEmail)) {
        throw new Error('Please enter a valid email address');
      }

      const { error } = await supabase.auth.updateUser({
        email: newEmail
      });

      if (error) throw error;

      toast.success('Email update initiated. Please check your new email for confirmation.');
    } catch (error: any) {
      console.error('Error updating email:', error);
      toast.error(error.message || 'Failed to update email');
      throw error;
    }
  };

  const createProfile = async (profileData: {
    full_name: string;
    phone?: string;
    role?: string;
  }) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase
        .from('profiles')
        .insert({
          user_id: user.id,
          ...profileData
        })
        .select()
        .single();

      if (error) throw error;

      setProfile(data);
      toast.success('Profile created successfully');
      return data;
    } catch (error: any) {
      console.error('Error creating profile:', error);
      toast.error('Failed to create profile');
      throw error;
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  return {
    profile,
    loading,
    updateProfile,
    updateEmail,
    createProfile,
    refreshProfile: fetchProfile
  };
};