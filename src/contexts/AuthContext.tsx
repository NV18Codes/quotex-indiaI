import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  demoBalance: number;
  liveBalance: number;
  totalTrades: number;
  winRate: number;
  totalPnL: number;
  tradeHistory: Trade[];
}

interface Trade {
  id: string;
  symbol: string;
  type: 'buy' | 'sell';
  amount: number;
  result: 'win' | 'loss';
  profit: number;
  timestamp: Date;
  duration: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  updateBalance: (amount: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Generate extensive trade history for the past 2-3 days
const generateTradeHistory = (): Trade[] => {
  const trades: Trade[] = [];
  const symbols = ['EUR/USD', 'GBP/USD', 'USD/JPY', 'AUD/USD', 'USD/CAD', 'EUR/GBP', 'USD/CHF', 'NZD/USD'];
  const now = new Date();
  
  // Generate trades for the past 3 days
  for (let i = 0; i < 11893; i++) {
    const daysAgo = Math.random() * 3; // Random day in the past 3 days
    const hoursAgo = Math.random() * 24; // Random hour
    const minutesAgo = Math.random() * 60; // Random minute
    
    const timestamp = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000) - (hoursAgo * 60 * 60 * 1000) - (minutesAgo * 60 * 1000));
    
    const amount = Math.floor(Math.random() * 1000) + 10; // $10 to $1010
    const isWin = Math.random() < 0.95; // 95% win rate
    const profit = isWin ? amount * (0.7 + Math.random() * 0.6) : -amount * (0.8 + Math.random() * 0.4);
    const duration = [30, 60, 120, 300, 600][Math.floor(Math.random() * 5)]; // 30s to 10m
    
    trades.push({
      id: `trade_${i}`,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      type: Math.random() > 0.5 ? 'buy' : 'sell',
      amount,
      result: isWin ? 'win' : 'loss',
      profit,
      timestamp,
      duration
    });
  }
  
  // Sort by timestamp (newest first)
  return trades.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

const defaultUser: User = {
  id: '1',
  name: 'Samuel Joseph',
  email: 'samuelkjoseph2020@gmail.com',
  demoBalance: 111111.45,
  liveBalance: 145897,
  totalTrades: 11893,
  winRate: 95,
  totalPnL: 349000,
  tradeHistory: generateTradeHistory()
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing login on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('qxTrader_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Check credentials
    if (email === 'samuelkjoseph2020@gmail.com' && password === 'Samuel2025!') {
      // Save user data to localStorage for persistence
      localStorage.setItem('qxTrader_user', JSON.stringify(defaultUser));
      setUser(defaultUser);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('qxTrader_user');
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateBalance = (amount: number) => {
    if (user) {
      setUser(prevUser => ({
        ...prevUser,
        liveBalance: prevUser.liveBalance + amount
      }));
      localStorage.setItem('qxTrader_user', JSON.stringify(user));
    }
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
    updateBalance
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Helper to get unified trade history and stats
export function getUnifiedTradeData(userTradeHistory?: any[]): { trades: any[]; stats: { totalTrades: number; winRate: number; totalProfit: number; winningTrades: number; } } {
  let baseTrades: any[] = [];
  if (userTradeHistory) {
    baseTrades = userTradeHistory;
  }
  const savedTrades = localStorage.getItem('userTrades');
  if (savedTrades) {
    baseTrades = JSON.parse(savedTrades).map((trade: any) => ({
      ...trade,
      timestamp: new Date(trade.timestamp)
    }));
  }
  // Only add fake trades if not already present
  if (baseTrades.length < 11893) {
    const fakeTrades: any[] = [];
    const winCount = Math.floor(11893 * 0.95);
    for (let i = 0; i < 11893; i++) {
      const isWin = i < winCount;
      const profit = isWin ? 30 + Math.random() * 50 : -30 - Math.random() * 30;
      fakeTrades.push({
        id: `fake_${i}`,
        symbol: i % 4 === 0 ? 'EUR/USD' : i % 4 === 1 ? 'BTC/USD' : i % 4 === 2 ? 'GBP/USD' : 'XAU/USD',
        type: i % 2 === 0 ? 'buy' : 'sell',
        amount: 100 + Math.floor(Math.random() * 400),
        duration: 60,
        result: isWin ? 'win' : 'loss',
        profit,
        timestamp: new Date(Date.now() - (i * 60000)),
        status: 'completed'
      });
    }
    baseTrades = [...fakeTrades, ...baseTrades];
  }
  // Calculate stats
  const completedTrades = baseTrades.filter(trade => trade.status === 'completed');
  const totalTrades = completedTrades.length;
  const winningTrades = completedTrades.filter(trade => trade.result === 'win').length;
  const totalProfit = completedTrades.reduce((sum, trade) => sum + (trade.profit || 0), 0);
  const winRate = totalTrades > 0 ? (winningTrades / totalTrades) * 100 : 0;
  return {
    trades: baseTrades,
    stats: {
      totalTrades,
      winRate,
      totalProfit,
      winningTrades
    }
  };
}