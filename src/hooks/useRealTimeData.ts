import { useState, useEffect, useCallback } from 'react';
import { Asset, Trade, OrderBookEntry } from '@/data/mockData';

export const useRealTimeData = (initialAssets: Asset[]) => {
  const [assets, setAssets] = useState<Asset[]>(initialAssets);
  const [recentTrades, setRecentTrades] = useState<Trade[]>([]);

  // Generate realistic price movements
  const updateAssetPrices = useCallback(() => {
    setAssets(prev => 
      prev.map(asset => {
        // More realistic price movement based on volatility
        const volatility = asset.symbol.includes('BTC') ? 0.015 : 
                          asset.symbol.includes('ETH') ? 0.012 : 
                          asset.symbol.includes('/') ? 0.003 : 0.008;
        
        const priceChange = (Math.random() - 0.5) * asset.price * volatility;
        const newPrice = Math.max(0, asset.price + priceChange);
        const change = newPrice - asset.price;
        const changePercent = (change / asset.price) * 100;

        // Update 24h high/low
        const newHigh = Math.max(asset.high24h, newPrice);
        const newLow = Math.min(asset.low24h, newPrice);

        return {
          ...asset,
          price: newPrice,
          change,
          changePercent,
          high24h: newHigh,
          low24h: newLow
        };
      })
    );
  }, []);

  // Generate new trades
  const generateNewTrade = useCallback((asset: Asset) => {
    const types: ('buy' | 'sell')[] = ['buy', 'sell'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    
    const newTrade: Trade = {
      id: Date.now().toString() + Math.random(),
      asset: asset.symbol,
      type: randomType,
      amount: Math.floor(Math.random() * 5000) + 100,
      price: asset.price + (Math.random() - 0.5) * asset.price * 0.001,
      time: new Date().toISOString(),
      profit: (Math.random() - 0.4) * 500
    };

    setRecentTrades(prev => [newTrade, ...prev.slice(0, 19)]); // Keep last 20 trades
  }, []);

  // Main update loop
  useEffect(() => {
    const interval = setInterval(() => {
      updateAssetPrices();
      
      // Randomly generate new trades
      if (Math.random() > 0.6) {
        const randomAsset = assets[Math.floor(Math.random() * assets.length)];
        generateNewTrade(randomAsset);
      }
    }, 2000); // Update every 2 seconds for more dynamic feel

    return () => clearInterval(interval);
  }, [updateAssetPrices, generateNewTrade, assets]);

  // Generate order book data
  const generateOrderBook = useCallback((basePrice: number): { bids: OrderBookEntry[], asks: OrderBookEntry[] } => {
    const bids: OrderBookEntry[] = [];
    const asks: OrderBookEntry[] = [];
    
    // Generate more realistic order book with varying spreads
    const spread = basePrice * 0.0001; // 0.01% spread
    
    for (let i = 0; i < 15; i++) {
      const bidPrice = basePrice - spread - (i * spread * 0.1);
      const askPrice = basePrice + spread + (i * spread * 0.1);
      
      bids.push({
        price: bidPrice,
        volume: Math.random() * 50 + 5
      });
      
      asks.push({
        price: askPrice,
        volume: Math.random() * 50 + 5
      });
    }
    
    return { bids, asks };
  }, []);

  return {
    assets,
    recentTrades,
    generateOrderBook,
    updateAssetPrices
  };
};