import { OrderBookEntry } from '@/data/mockData';

interface OrderBookProps {
  bids: OrderBookEntry[];
  asks: OrderBookEntry[];
  formatPrice: (price: number) => string;
}

const OrderBook = ({ bids, asks, formatPrice }: OrderBookProps) => {
  const maxVolume = Math.max(
    ...bids.map(b => b.volume),
    ...asks.map(a => a.volume)
  );

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <h3 className="font-semibold mb-4">Order Book</h3>
      
      <div className="space-y-4">
        {/* ASKS */}
        <div>
          <div className="text-xs text-muted-foreground mb-2 font-medium">ASKS</div>
          <div className="space-y-1">
            {asks.slice(0, 8).reverse().map((ask, index) => (
              <div key={index} className="relative">
                <div 
                  className="absolute inset-0 bg-trading-bear/10 rounded"
                  style={{ 
                    width: `${(ask.volume / maxVolume) * 100}%`,
                    right: 0
                  }}
                />
                <div className="relative flex justify-between text-xs py-1 px-2">
                  <span className="text-trading-bear font-medium">{formatPrice(ask.price)}</span>
                  <span className="text-muted-foreground">{ask.volume.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Price */}
        <div className="border-t border-border pt-2">
          <div className="text-center py-2 bg-trading-surface rounded-lg">
            <div className="text-sm font-bold text-primary">
              {formatPrice((bids[0]?.price + asks[0]?.price) / 2)}
            </div>
            <div className="text-xs text-muted-foreground">Current Price</div>
          </div>
        </div>

        {/* BIDS */}
        <div>
          <div className="text-xs text-muted-foreground mb-2 font-medium">BIDS</div>
          <div className="space-y-1">
            {bids.slice(0, 8).map((bid, index) => (
              <div key={index} className="relative">
                <div 
                  className="absolute inset-0 bg-trading-bull/10 rounded"
                  style={{ 
                    width: `${(bid.volume / maxVolume) * 100}%`,
                    left: 0
                  }}
                />
                <div className="relative flex justify-between text-xs py-1 px-2">
                  <span className="text-trading-bull font-medium">{formatPrice(bid.price)}</span>
                  <span className="text-muted-foreground">{bid.volume.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderBook; 