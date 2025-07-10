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
    <div className="bg-white border-y border-gray-200 py-4 overflow-hidden shadow-sm">
      <div className="flex animate-scroll">
        <div className="flex space-x-6 min-w-max">
          {assets.concat(assets).map((asset, index) => (
            <div key={`${asset.id}-${index}`} className="flex items-center space-x-4 px-6 py-3 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-sm font-semibold text-gray-700">{asset.symbol}</div>
              <div className="text-xl font-bold text-gray-900">
                ${asset.price.toLocaleString(undefined, { 
                  minimumFractionDigits: 2, 
                  maximumFractionDigits: asset.symbol.includes('/') ? 4 : 2 
                })}
              </div>
              <div className={`flex items-center space-x-1 text-sm font-bold px-2 py-1 rounded-full ${
                asset.changePercent >= 0 
                  ? 'text-green-700 bg-green-100' 
                  : 'text-red-700 bg-red-100'
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