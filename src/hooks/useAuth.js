import { useState, useEffect } from 'react';
import { mockUsers } from '../data/mockData';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('adscreenhub_user');
    
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
    
    setLoading(false);
  }, []);

  // Login function
  const login = (email, password, rememberMe) => {
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const userData = { ...foundUser };
      delete userData.password; // Don't store password in state
      
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
    
    // Save to localStorage for demo purposes
    localStorage.setItem('adscreenhub_user', JSON.stringify(userDataForState));
    
    // Update state immediately after localStorage
    setUser(userDataForState);
    setIsAuthenticated(true);
    
    return { success: true, user: userDataForState };
  };

  // Logout function
  const logout = () => {
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

  return {
    user,
    isAuthenticated,
    loading,
    login,
    signup,
    logout,
    updateProfile
  };
};
