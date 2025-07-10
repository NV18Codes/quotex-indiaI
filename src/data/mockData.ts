export interface Asset {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  high24h: number;
  low24h: number;
}

export interface Trade {
  id: string;
  asset: string;
  type: 'buy' | 'sell';
  amount: number;
  price: number;
  time: string;
  profit?: number;
}

export interface OrderBookEntry {
  price: number;
  volume: number;
}

export interface ChartData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export const mockAssets: Asset[] = [
  {
    id: '1',
    name: 'Bitcoin',
    symbol: 'BTC/USD',
    price: 43567.89,
    change: 1234.56,
    changePercent: 2.91,
    volume: '2.4B',
    high24h: 44000,
    low24h: 42000
  },
  {
    id: '2',
    name: 'Ethereum',
    symbol: 'ETH/USD',
    price: 2678.45,
    change: -34.12,
    changePercent: -1.26,
    volume: '1.8B',
    high24h: 2750,
    low24h: 2620
  },
  {
    id: '3',
    name: 'Tesla Inc',
    symbol: 'TSLA',
    price: 189.73,
    change: 2.45,
    changePercent: 1.31,
    volume: '892M',
    high24h: 191.2,
    low24h: 187.1
  },
  {
    id: '4',
    name: 'EUR/USD',
    symbol: 'EUR/USD',
    price: 1.0876,
    change: 0.0012,
    changePercent: 0.11,
    volume: '4.2B',
    high24h: 1.0891,
    low24h: 1.0854
  },
  {
    id: '5',
    name: 'Gold',
    symbol: 'XAU/USD',
    price: 2034.56,
    change: -8.23,
    changePercent: -0.40,
    volume: '1.2B',
    high24h: 2045.8,
    low24h: 2028.9
  },
  {
    id: '6',
    name: 'S&P 500',
    symbol: 'SPX',
    price: 4567.89,
    change: 23.45,
    changePercent: 0.52,
    volume: '3.1B',
    high24h: 4580.2,
    low24h: 4540.1
  },
  {
    id: '7',
    name: 'Crude Oil',
    symbol: 'WTI/USD',
    price: 78.45,
    change: -1.23,
    changePercent: -1.54,
    volume: '1.5B',
    high24h: 80.1,
    low24h: 77.8
  },
  {
    id: '8',
    name: 'USD/JPY',
    symbol: 'USD/JPY',
    price: 149.23,
    change: 0.45,
    changePercent: 0.30,
    volume: '2.8B',
    high24h: 149.8,
    low24h: 148.9
  }
];

export const mockTrades: Trade[] = [
  {
    id: '1',
    asset: 'BTC/USD',
    type: 'buy',
    amount: 100,
    price: 43567.89,
    time: new Date(Date.now() - 300000).toISOString(), // 5 minutes ago
    profit: 23.45
  },
  {
    id: '2',
    asset: 'ETH/USD',
    type: 'sell',
    amount: 500,
    price: 2678.45,
    time: new Date(Date.now() - 180000).toISOString(), // 3 minutes ago
    profit: -12.78
  },
  {
    id: '3',
    asset: 'AAPL',
    type: 'buy',
    amount: 250,
    price: 189.73,
    time: new Date(Date.now() - 120000).toISOString(), // 2 minutes ago
    profit: 45.67
  }
];

export const generateOrderBook = (basePrice: number): { bids: OrderBookEntry[], asks: OrderBookEntry[] } => {
  const bids: OrderBookEntry[] = [];
  const asks: OrderBookEntry[] = [];
  
  for (let i = 0; i < 10; i++) {
    bids.push({
      price: basePrice - (i + 1) * 0.01,
      volume: Math.random() * 10 + 1
    });
    asks.push({
      price: basePrice + (i + 1) * 0.01,
      volume: Math.random() * 10 + 1
    });
  }
  
  return { bids, asks };
};

export const generateChartData = (days: number = 30): ChartData[] => {
  const data: ChartData[] = [];
  let basePrice = 43567.89; // Start with current BTC price
  const now = new Date();
  
  // Generate more realistic candlestick data with proper OHLC
  for (let i = days; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    
    // Add some trend and volatility
    const trend = Math.sin(i * 0.1) * 0.02; // Cyclical trend
    const volatility = 0.015; // 1.5% daily volatility
    const randomWalk = (Math.random() - 0.5) * volatility;
    
    const priceChange = basePrice * (trend + randomWalk);
    const open = basePrice;
    const close = basePrice + priceChange;
    
    // Generate realistic high and low based on open/close
    const bodyRange = Math.abs(close - open);
    const wickRange = bodyRange * (1 + Math.random() * 2); // Wick can be 1-3x body size
    
    const high = Math.max(open, close) + Math.random() * wickRange;
    const low = Math.min(open, close) - Math.random() * wickRange;
    
    data.push({
      time: date.toISOString().split('T')[0],
      open,
      high,
      low,
      close,
      volume: Math.random() * 2000000 + 1000000 // 1-3M volume
    });
    
    basePrice = close;
  }
  
  return data;
};