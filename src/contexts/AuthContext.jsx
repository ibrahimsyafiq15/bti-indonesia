import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Hardcoded credentials for demo
const HARDCODED_CREDENTIALS = {
  email: 'admin@bti.co.id',
  password: 'admin123'
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing auth on mount
  useEffect(() => {
    console.log('[Auth] Checking auth status...');
    const token = localStorage.getItem('bti_auth_token');
    const storedUser = localStorage.getItem('bti_auth_user');
    
    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log('[Auth] User found:', parsedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        // Invalid stored data, clear it
        localStorage.removeItem('bti_auth_token');
        localStorage.removeItem('bti_auth_user');
      }
    } else {
      console.log('[Auth] No user found, not authenticated');
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    console.log('[Auth] Login attempt:', email);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Validate credentials
    if (email === HARDCODED_CREDENTIALS.email && password === HARDCODED_CREDENTIALS.password) {
      const userData = {
        email: email,
        name: 'Administrator',
        role: 'admin'
      };
      
      // Generate a simple token (in production, this comes from the server)
      const token = btoa(`${email}:${Date.now()}`);
      
      // Store in localStorage
      localStorage.setItem('bti_auth_token', token);
      localStorage.setItem('bti_auth_user', JSON.stringify(userData));
      
      // Update state
      setUser(userData);
      setIsAuthenticated(true);
      console.log('[Auth] Login successful');
      
      return { success: true };
    } else {
      console.error('[Auth] Login failed:', 'Invalid email or password');
      return { 
        success: false, 
        error: 'Invalid email or password' 
      };
    }
  };

  const logout = () => {
    console.log('[Auth] Logout called');
    // Clear localStorage
    localStorage.removeItem('bti_auth_token');
    localStorage.removeItem('bti_auth_user');
    
    // Update state
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
