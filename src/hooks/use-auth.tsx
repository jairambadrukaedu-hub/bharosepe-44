import { create } from 'zustand';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';


interface AuthStore {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, userData?: any) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signInWithOAuth: (provider: 'google' | 'github' | 'twitter') => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  initialize: () => void;
  checkUserProfileStatus: () => Promise<boolean>;
}

export const useAuth = create<AuthStore>((set, get) => {
  let initialized = false;
  
  return {
    user: null,
    session: null,
    loading: true,

    initialize: () => {
      if (initialized) {
        console.log('🔄 Auth already initialized, skipping...');
        return;
      }
      
      console.log('🔄 Initializing auth...');
      initialized = true;
      
      // Set up auth state listener
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (event, session) => {
          console.log('🔄 Auth state changed:', event, session?.user?.id || 'no user');
          set({ 
            session, 
            user: session?.user ?? null,
            loading: false 
          });
        }
      );

      // Check for existing session
      supabase.auth.getSession().then(({ data: { session }, error }) => {
        if (error) {
          console.error('❌ Error getting session:', error);
        }
        console.log('🔄 Current session check:', session?.user?.id || 'no user');
        set({ 
          session, 
          user: session?.user ?? null,
          loading: false 
        });
      });
    },

  signUp: async (email: string, password: string, userData = {}) => {
    const redirectUrl = `${window.location.origin}/dashboard`;
    
    // Create auth user ONLY - don't pass userData which may have invalid fields
    // The Supabase trigger will create a basic profile automatically
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl
      }
    });

    if (authError) {
      console.error('Auth error:', authError);
      toast.error(authError.message);
      return { error: authError };
    }

    // After successful auth, enhance the profile in the background
    // The trigger creates basic profile, we add custom fields
    if (authData.user) {
      setTimeout(async () => {
        try {
          const { error: profileError } = await supabase
            .from('profiles')
            .update({
              full_name: userData?.full_name || null,
              phone: userData?.phone || null,
              address: userData?.address || null,
              city: userData?.city || null,
              state: userData?.state || null,
              pincode: userData?.pincode || null,
              pan_number: userData?.pan_number || null,
              gst_number: userData?.gst_number || null,
              business_name: userData?.business_name || null,
              business_type: userData?.business_type || null
            })
            .eq('id', authData.user.id);

          if (profileError) {
            console.warn('Profile update (non-critical):', profileError);
          }
        } catch (err) {
          console.warn('Error updating profile:', err);
        }
      }, 500);
    }

    toast.success('Account created! Please check your email to verify.');
    return { error: null };
  },

  signIn: async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Welcome back!');
    }

    return { error };
  },

  signInWithOAuth: async (provider: 'google' | 'github' | 'twitter') => {
    const redirectUrl = `${window.location.origin}/dashboard`;
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: redirectUrl
      }
    });

    if (error) {
      toast.error(error.message);
    }

    return { error };
  },

  signOut: async () => {
    set({ loading: true });
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
      set({ loading: false });
    } else {
      toast.success('Signed out successfully');
      set({ user: null, session: null, loading: false });
    }
  },

  checkUserProfileStatus: async () => {
    const { user } = get();
    if (!user) return false;
    
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('phone')
        .eq('user_id', user.id)
        .single();
      
      return !!profile?.phone;
    } catch (error) {
      console.error('Error checking profile:', error);
      return false;
    }
  }
};
});