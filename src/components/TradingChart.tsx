import { useEffect, useState } from 'react';
import { generateChartData, ChartData } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, BarChart3, Activity } from 'lucide-react';

const TradingChart = () => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [timeframe, setTimeframe] = useState('1D');
  const [chartType, setChartType] = useState<'line' | 'candle'>('line');
  const [currentPrice, setCurrentPrice] = useState(43567.89);

  useEffect(() => {
    setChartData(generateChartData());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrice(prev => {
        const change = (Math.random() - 0.5) * prev * 0.001;
        return Math.max(0, prev + change);
      });

      setChartData(prev => {
        const newData = [...prev];
        const lastPoint = newData[newData.length - 1];
        if (lastPoint) {
          const change = (Math.random() - 0.5) * lastPoint.close * 0.002;
          newData[newData.length - 1] = {
            ...lastPoint,
            close: Math.max(0, lastPoint.close + change)
          };
        }
        return newData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const timeframes = ['1M', '5M', '15M', '1H', '4H', '1D', '1W'];

  const formatPrice = (value: number) => {
    return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <section id="trading" className="bg-trading-bg-dark py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Live Trading Chart</h2>
          <p className="text-muted-foreground mt-2">Real-time market data and advanced charting tools</p>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          {/* Chart Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <h3 className="text-2xl font-bold">BTC/USD</h3>
              <div className="flex items-center space-x-2">
                <span className="text-3xl font-bold">{formatPrice(currentPrice)}</span>
                <div className="flex items-center space-x-1 text-trading-bull">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm">+2.91%</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Chart Type Toggle */}
              <div className="flex border border-border rounded-lg">
                <Button
                  variant={chartType === 'line' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setChartType('line')}
                  className="rounded-r-none"
                >
                  <Activity className="h-4 w-4" />
                </Button>
                <Button
                  variant={chartType === 'candle' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setChartType('candle')}
                  className="rounded-l-none"
                >
                  <BarChart3 className="h-4 w-4" />
                </Button>
              </div>

              {/* Timeframe Selector */}
              <div className="flex space-x-1">
                {timeframes.map((tf) => (
                  <Button
                    key={tf}
                    variant={timeframe === tf ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setTimeframe(tf)}
                    className="text-xs"
                  >
                    {tf}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Chart - Simplified Canvas Chart */}
          <div className="h-96 bg-trading-surface rounded-lg relative overflow-hidden">
            <canvas
              ref={(canvas) => {
                if (!canvas || chartData.length === 0) return;
                
                const ctx = canvas.getContext('2d');
                if (!ctx) return;
                
                const rect = canvas.getBoundingClientRect();
                canvas.width = rect.width;
                canvas.height = rect.height;
                
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                // Draw grid
                ctx.strokeStyle = 'hsl(var(--border))';
                ctx.lineWidth = 1;
                ctx.setLineDash([3, 3]);
                
                for (let i = 0; i <= 10; i++) {
                  const y = (canvas.height / 10) * i;
                  ctx.beginPath();
                  ctx.moveTo(0, y);
                  ctx.lineTo(canvas.width, y);
                  ctx.stroke();
                }
                
                for (let i = 0; i <= 20; i++) {
                  const x = (canvas.width / 20) * i;
                  ctx.beginPath();
                  ctx.moveTo(x, 0);
                  ctx.lineTo(x, canvas.height);
                  ctx.stroke();
                }
                
                // Draw price line
                ctx.setLineDash([]);
                ctx.strokeStyle = 'hsl(var(--primary))';
                ctx.lineWidth = 2;
                
                const minPrice = Math.min(...chartData.map(d => d.close));
                const maxPrice = Math.max(...chartData.map(d => d.close));
                const priceRange = maxPrice - minPrice;
                
                ctx.beginPath();
                chartData.forEach((point, index) => {
                  const x = (canvas.width / (chartData.length - 1)) * index;
                  const y = canvas.height - ((point.close - minPrice) / priceRange) * canvas.height;
                  
                  if (index === 0) {
                    ctx.moveTo(x, y);
                  } else {
                    ctx.lineTo(x, y);
                  }
                });
                ctx.stroke();
                
                // Draw current price indicator
                const lastPrice = chartData[chartData.length - 1]?.close;
                if (lastPrice) {
                  const y = canvas.height - ((lastPrice - minPrice) / priceRange) * canvas.height;
                  ctx.strokeStyle = 'hsl(var(--primary))';
                  ctx.fillStyle = 'hsl(var(--primary))';
                  ctx.lineWidth = 1;
                  ctx.setLineDash([5, 5]);
                  
                  ctx.beginPath();
                  ctx.moveTo(0, y);
                  ctx.lineTo(canvas.width, y);
                  ctx.stroke();
                  
                  ctx.beginPath();
                  ctx.arc(canvas.width - 10, y, 4, 0, 2 * Math.PI);
                  ctx.fill();
                }
              }}
              className="w-full h-full"
            />
            
            {/* Price overlay */}
            <div className="absolute top-4 left-4 bg-background/90 rounded-lg p-2 text-sm">
              <div className="font-semibold">{formatPrice(currentPrice)}</div>
              <div className="text-xs text-muted-foreground">Live Price</div>
            </div>
          </div>

          {/* Trading Controls */}
          <div className="mt-6 grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-trading-surface rounded-lg p-3">
                  <div className="text-xs text-muted-foreground">High 24h</div>
                  <div className="text-sm font-bold">{formatPrice(44000)}</div>
                </div>
                <div className="bg-trading-surface rounded-lg p-3">
                  <div className="text-xs text-muted-foreground">Low 24h</div>
                  <div className="text-sm font-bold">{formatPrice(42000)}</div>
                </div>
                <div className="bg-trading-surface rounded-lg p-3">
                  <div className="text-xs text-muted-foreground">Volume</div>
                  <div className="text-sm font-bold">2.4B</div>
                </div>
                <div className="bg-trading-surface rounded-lg p-3">
                  <div className="text-xs text-muted-foreground">Market Cap</div>
                  <div className="text-sm font-bold">854.2B</div>
                </div>
              </div>
            </div>

            <div className="bg-trading-surface rounded-lg p-4">
              <h4 className="font-semibold mb-3">Quick Trade</h4>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Investment</span>
                  <span>$100</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Potential Profit</span>
                  <span className="text-primary font-semibold">$98 (98%)</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button className="bg-trading-bull hover:bg-trading-bull/90">
                    CALL ↑
                  </Button>
                  <Button className="bg-trading-bear hover:bg-trading-bear/90">
                    PUT ↓
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TradingChart;