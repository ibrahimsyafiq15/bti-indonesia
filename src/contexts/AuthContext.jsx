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

    // Get stored user data to check the current email
    const storedUser = localStorage.getItem('bti_auth_user');
    let validEmail = HARDCODED_CREDENTIALS.email;
    let validName = 'Administrator';
    
    // If user exists in localStorage, use that email for validation
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        validEmail = parsedUser.email || HARDCODED_CREDENTIALS.email;
        validName = parsedUser.name || 'Administrator';
        console.log('[Auth] Using stored email for validation:', validEmail);
      } catch (e) {
        console.error('[Auth] Error parsing stored user:', e);
      }
    }

    // Validate credentials - password is always hardcoded for demo
    if (email === validEmail && password === HARDCODED_CREDENTIALS.password) {
      const userData = {
        email: email,
        name: validName,
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
      console.log('[Auth] Login successful with email:', email);
      
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

  const updateUser = (userData) => {
    console.log('[Auth] Updating user:', userData);
    // Update localStorage
    const updatedUser = { ...user, ...userData };
    localStorage.setItem('bti_auth_user', JSON.stringify(updatedUser));
    // Update state
    setUser(updatedUser);
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateUser
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
