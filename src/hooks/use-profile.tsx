import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/use-auth';
import { toast } from 'sonner';

export interface UserProfile {
  id: string;
  user_id: string;
  full_name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  pan_number?: string;
  gst_number?: string;
  business_name?: string;
  business_type?: string;
  verified_phone?: boolean;
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
      setLoading(false);
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

      if (error) {
        if (error.code === 'PGRST116') {
          // No profile found - this is expected for new users
          console.log('useProfile - No profile found, user needs to create one');
          setProfile(null);
        } else {
          console.error('useProfile - Database error fetching profile:', error);
          toast.error('Failed to load profile: ' + error.message);
        }
      } else {
        console.log('useProfile - Setting profile data:', data);
        setProfile(data);
      }
    } catch (error: any) {
      console.error('useProfile - Unexpected error fetching profile:', error);
      toast.error('Unexpected error loading profile');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: {
    full_name?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
    pan_number?: string;
    gst_number?: string;
    business_name?: string;
    business_type?: string;
    verified_phone?: boolean;
    avatar_url?: string;
  }) => {
    if (!user) throw new Error('User not authenticated');

    try {
      console.log('useProfile - Updating profile with data:', updates);
      
      // Validate phone number if provided
      if (updates.phone) {
        const cleanPhone = updates.phone.replace(/\D/g, '');
        if (cleanPhone.length !== 10) {
          throw new Error('Please enter a valid 10-digit phone number');
        }
        updates.phone = cleanPhone;
      }

      // Validate full name if provided
      if (updates.full_name !== undefined && !updates.full_name?.trim()) {
        throw new Error('Full name cannot be empty');
      }

      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) {
        console.error('useProfile - Database error updating profile:', error);
        throw error;
      }

      console.log('useProfile - Profile updated successfully:', data);
      setProfile(data);
      toast.success('Profile updated successfully');
      return data;
    } catch (error: any) {
      console.error('useProfile - Error updating profile:', error);
      const errorMessage = error.message || 'Failed to update profile';
      toast.error(errorMessage);
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
    email?: string;
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
    pan_number?: string;
    gst_number?: string;
    business_name?: string;
    business_type?: string;
  }) => {
    if (!user) throw new Error('User not authenticated');

    try {
      console.log('useProfile - Creating profile with data:', profileData);
      
      // Validate required fields
      if (!profileData.full_name?.trim()) {
        throw new Error('Full name is required');
      }
      
      // Validate phone number if provided
      if (profileData.phone) {
        const cleanPhone = profileData.phone.replace(/\D/g, '');
        if (cleanPhone.length !== 10) {
          throw new Error('Please enter a valid 10-digit phone number');
        }
      }
      
      const { data, error } = await supabase
        .from('profiles')
        .insert({
          user_id: user.id,
          full_name: profileData.full_name.trim(),
          phone: profileData.phone?.replace(/\D/g, '') || null,
          email: profileData.email?.trim() || null,
          address: profileData.address?.trim() || null,
          city: profileData.city?.trim() || null,
          state: profileData.state?.trim() || null,
          pincode: profileData.pincode?.trim() || null,
          pan_number: profileData.pan_number?.toUpperCase().trim() || null,
          gst_number: profileData.gst_number?.toUpperCase().trim() || null,
          business_name: profileData.business_name?.trim() || null,
          business_type: profileData.business_type || null
        })
        .select()
        .single();

      if (error) {
        console.error('useProfile - Database error creating profile:', error);
        throw error;
      }

      console.log('useProfile - Profile created successfully:', data);
      setProfile(data);
      toast.success('Profile created successfully');
      return data;
    } catch (error: any) {
      console.error('useProfile - Error creating profile:', error);
      const errorMessage = error.message || 'Failed to create profile';
      toast.error(errorMessage);
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