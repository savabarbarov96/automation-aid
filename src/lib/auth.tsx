
import { supabase } from "@/integrations/supabase/client";
import { User } from "@/types/blog";
import { useState, useEffect, createContext, useContext } from "react";

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: Error | null;
}

export const useAuthState = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // First check if there's an active session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;
        
        if (!session) {
          setAuthState({ user: null, loading: false, error: null });
          return;
        }
        
        // If there's a session, get the user details from the blog_users table
        const { data: userData, error: userError } = await supabase
          .from('blog_users')
          .select('*')
          .eq('email', session.user.email)
          .single();
          
        if (userError) {
          console.error('Error fetching user data:', userError);
          // If we can't find the user in blog_users, we'll use basic auth user info
          setAuthState({ 
            user: { 
              id: session.user.id,
              email: session.user.email || '',
              username: session.user.email?.split('@')[0] || 'user',
              full_name: session.user.user_metadata?.full_name || '',
              is_active: true
            },
            loading: false,
            error: null,
          });
          return;
        }
        
        setAuthState({ 
          user: userData as User, 
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error('Auth error:', error);
        setAuthState({ 
          user: null, 
          loading: false, 
          error: error as Error 
        });
      }
    };

    // Execute the function
    fetchUser();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        fetchUser();
      } else {
        setAuthState({ user: null, loading: false, error: null });
      }
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return authState;
};

// Create a context for authentication
export const AuthContext = createContext<AuthState>({
  user: null,
  loading: true,
  error: null,
});

// Create a provider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuthState();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Login function
export const loginWithEmail = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Login error:', error);
    return { data: null, error };
  }
};

// Logout function
export const logout = async () => {
  try {
    console.log("Logging out user...");
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error("Logout error from Supabase:", error);
      throw error;
    }
    
    // Force clear any auth state in storage
    window.localStorage.removeItem("supabase.auth.token");
    
    console.log("Logout successful");
    return { error: null };
  } catch (error) {
    console.error('Logout error:', error);
    return { error };
  }
};
