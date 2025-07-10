import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  accountType: 'demo' | 'live';
  demoBalance: number;
  liveBalance: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  switchAccount: (type: 'demo' | 'live') => void;
  currentBalance: number;
  currentTime: string;
  isLiveBalanceVisible: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [isLiveBalanceVisible, setIsLiveBalanceVisible] = useState<boolean>(false);

  // Mock user data
  const mockUser: User = {
    id: '1',
    email: 'demo@qxbroker.com',
    name: 'Demo User',
    accountType: 'demo',
    demoBalance: 10000,
    liveBalance: 11045
  };

  // Update time every second and check for balance visibility
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      // Format time for US Eastern Time
      const estTime = new Date(now.toLocaleString("en-US", {timeZone: "America/New_York"}));
      const pstTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Los_Angeles"}));
      
      // Check if current time is 11:45 PM in either EST or PST
      const estHour = estTime.getHours();
      const estMinute = estTime.getMinutes();
      const pstHour = pstTime.getHours();
      const pstMinute = pstTime.getMinutes();
      
      const isTargetTime = 
        (estHour === 23 && estMinute === 45) || 
        (pstHour === 23 && pstMinute === 45);
      
      setIsLiveBalanceVisible(isTargetTime);
      
      // Display EST time
      setCurrentTime(estTime.toLocaleString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication
    if (email && password) {
      setUser(mockUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const switchAccount = (type: 'demo' | 'live') => {
    if (user) {
      setUser({ ...user, accountType: type });
    }
  };

  const getCurrentBalance = (): number => {
    if (!user) return 0;
    
    if (user.accountType === 'demo') {
      return user.demoBalance;
    }
    
    // For live account, show balance only at 11:45 PM EST/PST
    if (user.accountType === 'live') {
      return isLiveBalanceVisible ? user.liveBalance : 0;
    }
    
    return 0;
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    switchAccount,
    currentBalance: getCurrentBalance(),
    currentTime,
    isLiveBalanceVisible
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};