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

  for (let i = 0; i < 11893; i++) {
    const daysAgo = Math.random() * 3;
    const hoursAgo = Math.random() * 24;
    const minutesAgo = Math.random() * 60;

    const timestamp = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000) - (hoursAgo * 60 * 60 * 1000) - (minutesAgo * 60 * 1000));

    const amount = Math.floor(Math.random() * 1000) + 10;
    const isWin = Math.random() < 0.95;
    const profit = isWin ? amount * (0.7 + Math.random() * 0.6) : -amount * (0.8 + Math.random() * 0.4);
    const duration = [30, 60, 120, 300, 600][Math.floor(Math.random() * 5)];

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

  return trades.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

// Three default users
const samuelUser: User = {
  id: '1',
  name: 'Samuel Joseph',
  email: 'samuelkjoseph2020@gmail.com',
  demoBalance: 0,
  liveBalance: 0,
  totalTrades: 11893,
  winRate: 95,
  totalPnL: 349000,
  tradeHistory: generateTradeHistory()
};

const jonathanUser: User = {
  id: '2',
  name: 'Jonathan George Jeremiah',
  email: 'jonathanjeremiah@example.com',
  demoBalance: 0,
  liveBalance: 0,
  totalTrades: 0,
  winRate: 0,
  totalPnL: 0,
  tradeHistory: []
};

const johnUser: User = {
  id: '3',
  name: 'John Osteen Patha',
  email: 'johnnydrummer10@gmail.com',
  demoBalance: 0,
  liveBalance: 0,
  totalTrades: 0,
  winRate: 0,
  totalPnL: 0,
  tradeHistory: []
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('qxTrader_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }

    const existingTrades = localStorage.getItem('userTrades');
    if (!existingTrades) {
      const defaultTrades = generateTradeHistory().map(trade => ({
        ...trade,
        status: 'completed'
      }));
      localStorage.setItem('userTrades', JSON.stringify(defaultTrades));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    let authenticatedUser: User | null = null;

    if (email === 'samuelkjoseph2020@gmail.com' && password === 'Samuel2025!') {
      authenticatedUser = samuelUser;
    } else if (email === 'johathan23j@gmail.com' && password === 'godfather23JGJJJ$!') {
      authenticatedUser = jonathanUser;
    } else if (email === 'johnnydrummer10@gmail.com' && password === 'drummer10') {
      authenticatedUser = johnUser;
    }

    if (authenticatedUser) {
      localStorage.setItem('qxTrader_user', JSON.stringify(authenticatedUser));
      setUser(authenticatedUser);
      setIsAuthenticated(true);

      const existingTrades = localStorage.getItem('userTrades');
      if (!existingTrades && authenticatedUser.tradeHistory.length > 0) {
        const defaultTrades = authenticatedUser.tradeHistory.map(trade => ({
          ...trade,
          status: 'completed'
        }));
        localStorage.setItem('userTrades', JSON.stringify(defaultTrades));
      }

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
      const updatedUser = {
        ...user,
        liveBalance: user.liveBalance + amount
      };
      setUser(updatedUser);
      localStorage.setItem('qxTrader_user', JSON.stringify(updatedUser));
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

// Unified trade data function
export function getUnifiedTradeData(userTradeHistory?: any[]): {
  trades: any[];
  stats: {
    totalTrades: number;
    winRate: number;
    totalProfit: number;
    winningTrades: number;
  };
} {
  let baseTrades: any[] = [];

  const savedTrades = localStorage.getItem('userTrades');
  if (savedTrades) {
    try {
      baseTrades = JSON.parse(savedTrades).map((trade: any) => ({
        ...trade,
        timestamp: new Date(trade.timestamp),
        status: trade.status || 'completed'
      }));
    } catch (error) {
      console.error('Error parsing saved trades:', error);
      baseTrades = [];
    }
  }

  if (baseTrades.length === 0 && userTradeHistory) {
    baseTrades = userTradeHistory.map(trade => ({
      ...trade,
      status: 'completed'
    }));
  }

  if (baseTrades.length === 0) {
    const defaultTrades = generateTradeHistory().map(trade => ({
      ...trade,
      status: 'completed'
    }));
    baseTrades = defaultTrades;
    localStorage.setItem('userTrades', JSON.stringify(defaultTrades));
  }

  if (baseTrades.length < 11893) {
    const additionalTrades = [];
    const currentCount = baseTrades.length;
    const neededCount = 11893 - currentCount;
    const winCount = Math.floor(neededCount * 0.95);

    for (let i = 0; i < neededCount; i++) {
      const isWin = i < winCount;
      const profit = isWin ? 30 + Math.random() * 50 : -30 - Math.random() * 30;
      additionalTrades.push({
        id: `additional_${currentCount + i}`,
        symbol: i % 4 === 0 ? 'EUR/USD' : i % 4 === 1 ? 'BTC/USD' : i % 4 === 2 ? 'GBP/USD' : 'XAU/USD',
        type: i % 2 === 0 ? 'buy' : 'sell',
        amount: 100 + Math.floor(Math.random() * 400),
        duration: 60,
        result: isWin ? 'win' : 'loss',
        profit,
        timestamp: new Date(Date.now() - ((currentCount + i) * 60000)),
        status: 'completed'
      });
    }
    baseTrades = [...additionalTrades, ...baseTrades];
    localStorage.setItem('userTrades', JSON.stringify(baseTrades));
  }

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
