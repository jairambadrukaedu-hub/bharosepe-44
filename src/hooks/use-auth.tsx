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
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: userData
      }
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Account created! Please check your email to verify.');
    }

    return { error };
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