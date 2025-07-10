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
    name: 'Apple Inc',
    symbol: 'AAPL',
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
  }
];

export const mockTrades: Trade[] = [
  {
    id: '1',
    asset: 'BTC/USD',
    type: 'buy',
    amount: 100,
    price: 43567.89,
    time: '14:32:15',
    profit: 23.45
  },
  {
    id: '2',
    asset: 'ETH/USD',
    type: 'sell',
    amount: 500,
    price: 2678.45,
    time: '14:30:42',
    profit: -12.78
  },
  {
    id: '3',
    asset: 'AAPL',
    type: 'buy',
    amount: 250,
    price: 189.73,
    time: '14:28:33',
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
  let basePrice = 43000;
  const now = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const open = basePrice + (Math.random() - 0.5) * 1000;
    const close = open + (Math.random() - 0.5) * 2000;
    const high = Math.max(open, close) + Math.random() * 500;
    const low = Math.min(open, close) - Math.random() * 500;
    
    data.push({
      time: date.toISOString().split('T')[0],
      open,
      high,
      low,
      close,
      volume: Math.random() * 1000000 + 500000
    });
    
    basePrice = close;
  }
  
  return data;
};