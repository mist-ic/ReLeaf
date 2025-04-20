import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient';

// Define the shape of the profile data (add more fields as needed)
interface Profile {
  id: string;
  name?: string;
  age?: number;
  points?: number; // Add points
  login_streak?: number; // Add login streak
  // Add other profile fields here
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>; // Add a function to manually refresh profile
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

  // --- Helper function to fetch profile ---
  const fetchProfile = async (userId: string) => {
    try {
      const { data, error, status } = await supabase
        .from('profiles')
        .select(`id, name, age, points, login_streak`) // Select points and login_streak
        .eq('id', userId)
        .single();

      if (error && status !== 406) {
        // 406 means no row found, which is okay initially
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
  // --- End helper function ---

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
        const currentSessionUser = session?.user ?? null;
        setSession(session);
        setUser(currentSessionUser);
        setProfile(null); // Reset profile on auth change
        if (currentSessionUser) {
           await fetchProfile(currentSessionUser.id); // Fetch profile immediately on auth change
        }
        setLoading(false);
      }
    );

    // Initial fetch on load
     const initializeAuth = async () => {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
            console.error("Error fetching session:", error);
        } else if (session?.user) {
            setSession(session);
            setUser(session.user);
            await fetchProfile(session.user.id); // Fetch profile if session exists on load
        }
        setLoading(false);
     };
     initializeAuth();

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

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

  // Function to allow manual profile refresh (e.g., after points update)
  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  const value = {
    session,
    user,
    profile,
    loading,
    signOut,
    refreshProfile, // Provide the refresh function
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