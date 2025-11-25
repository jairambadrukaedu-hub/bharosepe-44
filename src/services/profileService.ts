/**
 * Profile Service
 * Handles fetching and managing buyer/seller profiles
 * Stores complete buyer/seller details for contract generation
 */

import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface UserProfile {
  userId: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  panNumber?: string;
  gstNumber?: string;
  businessName?: string;
  businessType?: 'individual' | 'business' | 'llc' | 'pvt_ltd';
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Fetch current user's profile
 */
export const getCurrentUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }

    return {
      userId: data.user_id,
      name: data.full_name || data.name || '',
      email: data.email || '',
      phone: data.phone || '',
      address: data.address || '',
      city: data.city || '',
      state: data.state || '',
      pincode: data.pincode || '',
      panNumber: data.pan_number || '',
      gstNumber: data.gst_number || '',
      businessName: data.business_name || '',
      businessType: data.business_type || 'individual',
      verified: data.verified_phone || false,
      createdAt: data.created_at || new Date().toISOString(),
      updatedAt: data.updated_at || new Date().toISOString()
    };
  } catch (error) {
    console.error('Profile fetch error:', error);
    return null;
  }
};

/**
 * Fetch any user's profile by ID (for seller/buyer details)
 */
export const getUserProfileById = async (userId: string): Promise<UserProfile | null> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }

    return {
      userId: data.user_id,
      name: data.full_name || data.name || '',
      email: data.email || '',
      phone: data.phone || '',
      address: data.address || '',
      city: data.city || '',
      state: data.state || '',
      pincode: data.pincode || '',
      panNumber: data.pan_number || '',
      gstNumber: data.gst_number || '',
      businessName: data.business_name || '',
      businessType: data.business_type || 'individual',
      verified: data.verified_phone || false,
      createdAt: data.created_at || new Date().toISOString(),
      updatedAt: data.updated_at || new Date().toISOString()
    };
  } catch (error) {
    console.error('User profile fetch error:', error);
    return null;
  }
};

/**
 * Update user profile during registration/editing
 */
export const updateUserProfile = async (userId: string, profileData: Partial<UserProfile>): Promise<boolean> => {
  try {
    const updateData: any = {
      full_name: profileData.name,
      email: profileData.email,
      phone: profileData.phone,
      address: profileData.address,
      city: profileData.city,
      state: profileData.state,
      pincode: profileData.pincode,
      pan_number: profileData.panNumber,
      gst_number: profileData.gstNumber,
      business_name: profileData.businessName,
      business_type: profileData.businessType,
      updated_at: new Date().toISOString()
    };

    // Remove undefined values
    Object.keys(updateData).forEach(key => {
      if (updateData[key] === undefined) delete updateData[key];
    });

    const { error } = await supabase
      .from('profiles')
      .update(updateData)
      .eq('user_id', userId);

    if (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
      return false;
    }

    toast.success('Profile updated successfully');
    return true;
  } catch (error) {
    console.error('Profile update error:', error);
    toast.error('Error updating profile');
    return false;
  }
};

/**
 * Get profile completion status
 */
export const getProfileCompletionStatus = (profile: UserProfile | null): {
  isComplete: boolean;
  completedFields: number;
  totalFields: number;
} => {
  if (!profile) {
    return { isComplete: false, completedFields: 0, totalFields: 10 };
  }

  const requiredFields = [
    profile.name,
    profile.email,
    profile.phone,
    profile.address,
    profile.city,
    profile.state,
    profile.pincode
  ];

  const completedFields = requiredFields.filter(field => field && field.trim() !== '').length;
  const totalFields = requiredFields.length;
  const isComplete = completedFields === totalFields;

  return { isComplete, completedFields, totalFields };
};

/**
 * Format profile for display in contracts
 */
export const formatProfileForContract = (profile: UserProfile | null, role: 'buyer' | 'seller'): string => {
  if (!profile) return '';

  const businessInfo = profile.businessType !== 'individual' 
    ? `\n${profile.businessName} (${profile.businessType})`
    : '';

  const panGst = [profile.panNumber, profile.gstNumber].filter(Boolean).join(' | ');
  const panGstLine = panGst ? `\nPAN/GST: ${panGst}` : '';

  const address = [profile.address, profile.city, profile.state, profile.pincode]
    .filter(Boolean)
    .join(', ');

  return `
${role === 'buyer' ? 'BUYER' : 'SELLER'} DETAILS:
Name: ${profile.name}${businessInfo}
Email: ${profile.email}
Phone: ${profile.phone}
Address: ${address}${panGstLine}
Status: ${profile.verified ? '✓ Verified' : 'Unverified'}
  `.trim();
};
