// Debug utility to test Supabase connection
import { supabase } from '@/integrations/supabase/client';

export const testSupabaseConnection = async () => {
  console.log('🔍 Testing Supabase connection...');
  
  try {
    // Test basic connection
    const { data: authData, error: authError } = await supabase.auth.getSession();
    console.log('✅ Auth connection:', { authData: !!authData, authError });
    
    // Test database connection by checking profiles table
    const { data, error } = await supabase
      .from('profiles')
      .select('count', { count: 'exact' })
      .limit(1);
      
    console.log('✅ Database connection:', { 
      success: !error, 
      error: error?.message || 'none',
      count: data?.length || 0
    });
    
    // Test user session
    if (authData?.session?.user) {
      console.log('✅ Current user:', authData.session.user.id);
      
      // Test profile fetch for current user
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', authData.session.user.id)
        .single();
        
      console.log('✅ Profile fetch:', { 
        hasProfile: !!profile, 
        error: profileError?.message || 'none',
        profileData: profile
      });
    } else {
      console.log('ℹ️ No authenticated user');
    }
    
    return true;
  } catch (error: any) {
    console.error('❌ Supabase connection test failed:', error);
    return false;
  }
};

// Auto-run test in development
if (import.meta.env.DEV) {
  testSupabaseConnection();
}