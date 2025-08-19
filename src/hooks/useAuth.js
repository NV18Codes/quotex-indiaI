import { useState, useEffect } from 'react';
import { mockUsers } from '../data/mockData';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Function to check and restore authentication state
  const checkAuthState = () => {
    const savedUser = localStorage.getItem('adscreenhub_user');
    
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        console.log('Restoring auth state from localStorage:', userData);
        setUser(userData);
        setIsAuthenticated(true);
        return true;
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('adscreenhub_user');
        setUser(null);
        setIsAuthenticated(false);
        return false;
      }
    } else {
      console.log('No saved user found in localStorage');
      setUser(null);
      setIsAuthenticated(false);
      return false;
    }
  };

  // Load user from localStorage on mount
  useEffect(() => {
    checkAuthState();
    setLoading(false);
  }, []);

  // Listen for storage changes (when localStorage is modified from other tabs/windows)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'adscreenhub_user') {
        console.log('Storage changed, checking auth state...');
        checkAuthState();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Login function
  const login = (email, password, rememberMe) => {
    console.log('Login attempt for email:', email);
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const userData = { ...foundUser };
      delete userData.password; // Don't store password in state
      
      console.log('User authenticated successfully:', userData);
      
      // Always save to localStorage for demo purposes
      localStorage.setItem('adscreenhub_user', JSON.stringify(userData));
      if (rememberMe) {
        localStorage.setItem('adscreenhub_rememberMe', 'true');
      } else {
        localStorage.removeItem('adscreenhub_rememberMe');
      }
      
      // Update state immediately after localStorage
      setUser(userData);
      setIsAuthenticated(true);
      
      return { success: true, user: userData };
    }
    
    console.log('Login failed: Invalid credentials');
    return { success: false, error: 'Invalid email or password' };
  };

  // Signup function
  const signup = (userData) => {
    // Check if email already exists
    const existingUser = mockUsers.find(u => u.email === userData.email);
    if (existingUser) {
      return { success: false, error: 'Email already exists' };
    }
    
    // Add new user to mock data
    const newUser = {
      id: mockUsers.length + 1,
      ...userData
    };
    
    mockUsers.push(newUser);
    
    // Auto-login after signup
    const userDataForState = { ...newUser };
    delete userDataForState.password;
    
    console.log('User signed up successfully:', userDataForState);
    
    // Save to localStorage for demo purposes
    localStorage.setItem('adscreenhub_user', JSON.stringify(userDataForState));
    
    // Update state immediately after localStorage
    setUser(userDataForState);
    setIsAuthenticated(true);
    
    return { success: true, user: userDataForState };
  };

  // Logout function
  const logout = () => {
    console.log('User logging out');
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('adscreenhub_user');
    localStorage.removeItem('adscreenhub_rememberMe');
  };

  // Update user profile
  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    
    // Update localStorage if remember me is enabled
    if (localStorage.getItem('adscreenhub_rememberMe') === 'true') {
      localStorage.setItem('adscreenhub_user', JSON.stringify(updatedUser));
    }
    
    return { success: true, user: updatedUser };
  };

  // Force refresh authentication state (useful for debugging)
  const refreshAuthState = () => {
    console.log('Forcing auth state refresh...');
    return checkAuthState();
  };

  return {
    user,
    isAuthenticated,
    loading,
    login,
    signup,
    logout,
    updateProfile,
    refreshAuthState,
    checkAuthState
  };
};
