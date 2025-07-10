import { Trade } from '@/data/mockData';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

interface RecentTradesProps {
  trades: Trade[];
  formatCurrency: (amount: number) => string;
}

const RecentTrades = ({ trades, formatCurrency }: RecentTradesProps) => {
  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <h3 className="font-semibold mb-4">Recent Trades</h3>
      
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {trades.map((trade) => (
          <div key={trade.id} className="bg-trading-surface rounded-lg p-3 hover:bg-trading-surface-hover transition-colors">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-2">
                <div className={`p-1 rounded-full ${
                  trade.type === 'buy' 
                    ? 'bg-trading-bull/20 text-trading-bull' 
                    : 'bg-trading-bear/20 text-trading-bear'
                }`}>
                  {trade.type === 'buy' ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                </div>
                <div>
                  <div className="text-sm font-medium">{trade.asset}</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(trade.time).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit'
                    })}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-sm font-medium ${
                  trade.type === 'buy' ? 'text-trading-bull' : 'text-trading-bear'
                }`}>
                  {trade.type.toUpperCase()}
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatCurrency(trade.amount)}
                </div>
                <div className="text-xs text-muted-foreground">
                  @ {trade.price.toFixed(4)}
                </div>
              </div>
            </div>
            
            {trade.profit !== undefined && (
              <div className="mt-2 pt-2 border-t border-border/50">
                <div className={`text-xs flex items-center justify-between ${
                  trade.profit >= 0 ? 'text-trading-bull' : 'text-trading-bear'
                }`}>
                  <span className="flex items-center">
                    <DollarSign className="h-3 w-3 mr-1" />
                    Profit/Loss
                  </span>
                  <span className="font-medium">
                    {trade.profit >= 0 ? '+' : ''}{formatCurrency(trade.profit)}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTrades; 