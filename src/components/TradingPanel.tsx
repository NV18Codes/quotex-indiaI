import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockAssets, mockTrades, generateOrderBook, Asset, OrderBookEntry, Trade } from '@/data/mockData';
import { TrendingUp, TrendingDown, Clock, DollarSign } from 'lucide-react';

const TradingPanel = () => {
  const [selectedAsset, setSelectedAsset] = useState<Asset>(mockAssets[0]);
  const [investment, setInvestment] = useState(100);
  const [orderBook, setOrderBook] = useState<{ bids: OrderBookEntry[], asks: OrderBookEntry[] }>({ bids: [], asks: [] });
  const [recentTrades, setRecentTrades] = useState<Trade[]>(mockTrades);
  const [assets, setAssets] = useState<Asset[]>(mockAssets);

  useEffect(() => {
    setOrderBook(generateOrderBook(selectedAsset.price));
  }, [selectedAsset]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Update asset prices
      setAssets(prev => 
        prev.map(asset => {
          const priceChange = (Math.random() - 0.5) * asset.price * 0.005;
          const newPrice = Math.max(0, asset.price + priceChange);
          const change = newPrice - asset.price;
          const changePercent = (change / asset.price) * 100;

          return {
            ...asset,
            price: newPrice,
            change,
            changePercent
          };
        })
      );

      // Update selected asset
      setSelectedAsset(prev => {
        const priceChange = (Math.random() - 0.5) * prev.price * 0.005;
        const newPrice = Math.max(0, prev.price + priceChange);
        const change = newPrice - prev.price;
        const changePercent = (change / prev.price) * 100;

        return {
          ...prev,
          price: newPrice,
          change,
          changePercent
        };
      });

      // Update order book
      setOrderBook(prev => generateOrderBook(selectedAsset.price));

      // Simulate new trades
      if (Math.random() > 0.7) {
        const newTrade: Trade = {
          id: Date.now().toString(),
          asset: selectedAsset.symbol,
          type: Math.random() > 0.5 ? 'buy' : 'sell',
          amount: Math.floor(Math.random() * 1000) + 10,
          price: selectedAsset.price + (Math.random() - 0.5) * 10,
          time: new Date().toLocaleTimeString(),
          profit: (Math.random() - 0.3) * 200
        };

        setRecentTrades(prev => [newTrade, ...prev.slice(0, 9)]);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedAsset.price, selectedAsset.symbol]);

  const potentialProfit = Math.floor(investment * 0.98);

  const formatPrice = (price: number) => {
    return selectedAsset.symbol.includes('/') 
      ? price.toFixed(4) 
      : price.toFixed(2);
  };

  return (
    <section className="bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Advanced Trading Panel</h2>
          <p className="text-muted-foreground mt-2">Complete trading interface with real-time data</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Asset Selection */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-semibold mb-4">Assets</h3>
            <div className="space-y-2">
              {assets.map((asset) => (
                <button
                  key={asset.id}
                  onClick={() => setSelectedAsset(asset)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedAsset.id === asset.id 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-trading-surface hover:bg-trading-surface-hover'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium text-sm">{asset.symbol}</div>
                      <div className="text-xs opacity-70">{asset.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold">
                        ${formatPrice(asset.price)}
                      </div>
                      <div className={`text-xs ${asset.changePercent >= 0 ? 'text-trading-bull' : 'text-trading-bear'}`}>
                        {asset.changePercent >= 0 ? '+' : ''}{asset.changePercent.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Trading Interface */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-semibold mb-4">Trade {selectedAsset.symbol}</h3>
            
            <div className="space-y-4">
              <div className="bg-trading-surface rounded-lg p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    ${formatPrice(selectedAsset.price)}
                  </div>
                  <div className={`text-sm ${selectedAsset.changePercent >= 0 ? 'text-trading-bull' : 'text-trading-bear'}`}>
                    {selectedAsset.changePercent >= 0 ? '+' : ''}{selectedAsset.changePercent.toFixed(2)}%
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground">Investment Amount</label>
                <Input
                  type="number"
                  value={investment}
                  onChange={(e) => setInvestment(Number(e.target.value))}
                  className="mt-1"
                />
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Potential Profit</span>
                <span className="text-primary font-semibold">${potentialProfit} (98%)</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button className="bg-trading-bull hover:bg-trading-bull/90 h-12">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  CALL
                </Button>
                <Button className="bg-trading-bear hover:bg-trading-bear/90 h-12">
                  <TrendingDown className="h-4 w-4 mr-2" />
                  PUT
                </Button>
              </div>

              <div className="text-xs text-muted-foreground text-center">
                <Clock className="h-3 w-3 inline mr-1" />
                Expires in: 15:00
              </div>
            </div>
          </div>

          {/* Order Book */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-semibold mb-4">Order Book</h3>
            
            <div className="space-y-4">
              <div>
                <div className="text-xs text-muted-foreground mb-2">ASKS</div>
                <div className="space-y-1">
                  {orderBook.asks.slice(0, 5).map((ask, index) => (
                    <div key={index} className="flex justify-between text-xs">
                      <span className="text-trading-bear">${formatPrice(ask.price)}</span>
                      <span className="text-muted-foreground">{ask.volume.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-border pt-2">
                <div className="text-xs text-muted-foreground mb-2">BIDS</div>
                <div className="space-y-1">
                  {orderBook.bids.slice(0, 5).map((bid, index) => (
                    <div key={index} className="flex justify-between text-xs">
                      <span className="text-trading-bull">${formatPrice(bid.price)}</span>
                      <span className="text-muted-foreground">{bid.volume.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Trades */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-semibold mb-4">Recent Trades</h3>
            
            <div className="space-y-2">
              {recentTrades.map((trade) => (
                <div key={trade.id} className="bg-trading-surface rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm font-medium">{trade.asset}</div>
                      <div className="text-xs text-muted-foreground">{trade.time}</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-medium ${trade.type === 'buy' ? 'text-trading-bull' : 'text-trading-bear'}`}>
                        {trade.type.toUpperCase()}
                      </div>
                      <div className="text-xs">${trade.amount}</div>
                    </div>
                  </div>
                  
                  {trade.profit !== undefined && (
                    <div className="mt-2 pt-2 border-t border-border/50">
                      <div className={`text-xs flex items-center ${trade.profit >= 0 ? 'text-trading-bull' : 'text-trading-bear'}`}>
                        <DollarSign className="h-3 w-3 mr-1" />
                        {trade.profit >= 0 ? '+' : ''}{trade.profit.toFixed(2)}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TradingPanel;