import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Contact {
  id: string; // This will be the user_id
  full_name: string;
  phone: string;
}

export const useContactSearch = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);

  const searchByPhone = async (phone: string) => {
    if (!phone || phone.length < 3) {
      setContacts([]);
      return;
    }

    console.log('🔍 Searching for phone:', phone);
    setLoading(true);

    try {
      // Normalize the input phone number (remove any non-digits)
      const normalizedPhone = phone.replace(/\D/g, '');
      
      console.log('📱 Normalized phone:', normalizedPhone);
      
      // Use RPC function to search profiles (bypasses RLS)
      const { data, error } = await supabase
        .rpc('search_profiles_by_phone', { search_phone: normalizedPhone });

      if (error) {
        console.error('❌ Search error:', error);
        throw error;
      }

      console.log('✅ Raw search results:', data);
      
      // Map results
      const validContacts = (data || []).map(contact => ({
        id: contact.user_id,
        full_name: contact.full_name || '',
        phone: contact.phone || ''
      }));
      
      console.log('✅ Final contacts:', validContacts);
      setContacts(validContacts);
    } catch (error: any) {
      console.error('❌ Error searching contacts:', error);
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  const findUserByPhone = async (phone: string): Promise<Contact | null> => {
    if (!phone) return null;
    
    console.log('🔍 Finding user by phone:', phone);
    
    try {
      // Normalize phone number
      const normalizedPhone = phone.replace(/\D/g, '');
      
      // Try exact matches first, then variations
      const searchPatterns = [
        normalizedPhone,                                    // 8374155974
        `+91${normalizedPhone}`,                           // +918374155974  
        normalizedPhone.startsWith('91') ? normalizedPhone.slice(2) : `91${normalizedPhone}`, // 918374155974 or 91+phone
        `0${normalizedPhone}`                              // 08374155974
      ];
      
      console.log('🎯 Searching patterns:', searchPatterns);
      
      // Search for any of these patterns
      const { data, error } = await supabase
        .from('profiles')
        .select('user_id, full_name, phone')
        .not('phone', 'is', null)
        .or(searchPatterns.map(pattern => `phone.eq.${pattern}`).join(','))
        .maybeSingle();
      
      if (error) {
        console.error('❌ Error in findUserByPhone:', error);
        return null;
      }
      
      if (data) {
        console.log('✅ Found user:', data);
        return {
          id: data.user_id,
          full_name: data.full_name || '',
          phone: data.phone || ''
        };
      }
      
      // If no exact match, try partial matching
      console.log('🔄 Trying partial match...');
      const { data: partialData, error: partialError } = await supabase
        .from('profiles')
        .select('user_id, full_name, phone')
        .not('phone', 'is', null)
        .or(searchPatterns.map(pattern => `phone.ilike.%${pattern}%`).join(','))
        .limit(1)
        .maybeSingle();
        
      if (partialError) {
        console.error('❌ Error in partial search:', partialError);
        return null;
      }
      
      if (partialData) {
        console.log('✅ Found user via partial match:', partialData);
        return {
          id: partialData.user_id,
          full_name: partialData.full_name || '',
          phone: partialData.phone || ''
        };
      }
      
      console.log('❌ No user found for phone:', phone);
      return null;
    } catch (error: any) {
      console.error('❌ Error in findUserByPhone:', error);
      return null;
    }
  };

  return {
    contacts,
    loading,
    searchByPhone,
    findUserByPhone
  };
};