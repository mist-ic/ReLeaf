import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient';

// Define the shape of the profile data (add more fields as needed)
interface Profile {
  id: string;
  name?: string;
  age?: number;
  // Add other profile fields here
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error);
      } else {
        setSession(session);
        setUser(session?.user ?? null);
      }
      setLoading(false);
    };

    fetchSession();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setProfile(null); // Reset profile on auth change, fetch it again if needed
        setLoading(false);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  // Fetch profile when user changes
  useEffect(() => {
    if (user && !profile) {
      const fetchProfile = async () => {
        try {
          const { data, error, status } = await supabase
            .from('profiles')
            .select(`id, name, age`)
            .eq('id', user.id)
            .single();

          if (error && status !== 406) {
            throw error;
          }

          if (data) {
            setProfile(data as Profile);
          }
        } catch (error: any) {
          console.error('Error fetching profile:', error.message);
          // Handle error appropriately, maybe show a toast
        }
      };
      fetchProfile();
    }
  }, [user, profile]);

  const signOut = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
      // Handle error (e.g., show toast)
    }
    // State updates handled by onAuthStateChange listener
    setLoading(false);
  };

  const value = {
    session,
    user,
    profile,
    loading,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 