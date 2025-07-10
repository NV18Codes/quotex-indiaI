import { useEffect, useState } from 'react';
import { mockAssets, Asset } from '@/data/mockData';
import { TrendingUp, TrendingDown } from 'lucide-react';

const MarketTicker = () => {
  const [assets, setAssets] = useState<Asset[]>(mockAssets);

  useEffect(() => {
    const interval = setInterval(() => {
      setAssets(prev => 
        prev.map(asset => {
          const priceChange = (Math.random() - 0.5) * asset.price * 0.01;
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
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-trading-surface border-y border-border py-4 overflow-hidden">
      <div className="flex animate-scroll">
        <div className="flex space-x-8 min-w-max">
          {assets.concat(assets).map((asset, index) => (
            <div key={`${asset.id}-${index}`} className="flex items-center space-x-3 px-4">
              <div className="text-sm font-medium">{asset.symbol}</div>
              <div className="text-lg font-bold">
                ${asset.price.toLocaleString(undefined, { 
                  minimumFractionDigits: 2, 
                  maximumFractionDigits: asset.symbol.includes('/') ? 4 : 2 
                })}
              </div>
              <div className={`flex items-center space-x-1 text-sm ${
                asset.changePercent >= 0 ? 'text-trading-bull' : 'text-trading-bear'
              }`}>
                {asset.changePercent >= 0 ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                <span>{asset.changePercent.toFixed(2)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketTicker;