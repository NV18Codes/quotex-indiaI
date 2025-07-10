import { useEffect, useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Activity, BarChart3, Settings, Palette, Grid3X3, Eye } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';

interface CandleData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface ChartSettings {
  theme: 'dark' | 'light' | 'blue' | 'green' | 'red';
  showVolume: boolean;
  showGrid: boolean;
  showPriceLine: boolean;
  chartType: 'candlestick' | 'line' | 'bar';
}

const TradingChart = () => {
  const [selectedAsset, setSelectedAsset] = useState('EUR/USD');
  const [timeframe, setTimeframe] = useState('1m');
  const [currentPrice, setCurrentPrice] = useState(1.0856);
  const [priceChange, setPriceChange] = useState(0.0023);
  const [priceChangePercent, setPriceChangePercent] = useState(0.21);
  const [isPriceUp, setIsPriceUp] = useState(true);
  const [candleData, setCandleData] = useState<CandleData[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [chartSettings, setChartSettings] = useState<ChartSettings>({
    theme: 'dark',
    showVolume: true,
    showGrid: true,
    showPriceLine: true,
    chartType: 'candlestick'
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const assets = [
    { name: 'EUR/USD', current: 1.0856, change: 0.0023, changePercent: 0.21 },
    { name: 'GBP/USD', current: 1.2645, change: -0.0018, changePercent: -0.14 },
    { name: 'USD/JPY', current: 148.23, change: 0.45, changePercent: 0.30 },
    { name: 'BTC/USD', current: 43250, change: 1250, changePercent: 2.98 },
    { name: 'ETH/USD', current: 2650, change: -45, changePercent: -1.67 },
    { name: 'XAU/USD', current: 2045.50, change: 12.30, changePercent: 0.60 }
  ];

  const timeframes = [
    { value: '30s', label: '30s' },
    { value: '1m', label: '1m' },
    { value: '5m', label: '5m' },
    { value: '15m', label: '15m' },
    { value: '1h', label: '1h' },
    { value: '4h', label: '4h' }
  ];

  const themes = {
    dark: {
      background: '#181c27',
      grid: '#2d3346',
      text: '#ffffff',
      upColor: '#10b981',
      downColor: '#ef4444',
      priceLine: '#3b82f6'
    },
    light: {
      background: '#ffffff',
      grid: '#e5e7eb',
      text: '#000000',
      upColor: '#059669',
      downColor: '#dc2626',
      priceLine: '#2563eb'
    },
    blue: {
      background: '#1e293b',
      grid: '#334155',
      text: '#ffffff',
      upColor: '#0ea5e9',
      downColor: '#f97316',
      priceLine: '#3b82f6'
    },
    green: {
      background: '#064e3b',
      grid: '#065f46',
      text: '#ffffff',
      upColor: '#22c55e',
      downColor: '#ef4444',
      priceLine: '#10b981'
    },
    red: {
      background: '#450a0a',
      grid: '#7f1d1d',
      text: '#ffffff',
      upColor: '#22c55e',
      downColor: '#dc2626',
      priceLine: '#ef4444'
    }
  };

  // Generate mock candlestick data
  const generateCandleData = (basePrice: number, count: number): CandleData[] => {
    const data: CandleData[] = [];
    let currentPrice = basePrice;
    
    for (let i = 0; i < count; i++) {
      const volatility = 0.001; // 0.1% volatility
      const open = currentPrice;
      const high = open * (1 + Math.random() * volatility * 2);
      const low = open * (1 - Math.random() * volatility * 2);
      const close = low + Math.random() * (high - low);
      const volume = Math.random() * 1000 + 100;
      
      data.push({
        time: Date.now() - (count - i) * 60000, // 1 minute intervals
        open,
        high,
        low,
        close,
        volume
      });
      
      currentPrice = close;
    }
    
    return data;
  };

  // Update price and data in real-time
  useEffect(() => {
    const asset = assets.find(a => a.name === selectedAsset);
    if (!asset) return;

    setCurrentPrice(asset.current);
    setPriceChange(asset.change);
    setPriceChangePercent(asset.changePercent);
    setIsPriceUp(asset.change >= 0);

    // Generate initial candle data
    setCandleData(generateCandleData(asset.current, 100));

    // Update price every 2 seconds
    const priceInterval = setInterval(() => {
      const volatility = 0.0005; // 0.05% volatility
      const change = (Math.random() - 0.5) * volatility * 2;
      const newPrice = asset.current * (1 + change);
      
      setCurrentPrice(newPrice);
      setPriceChange(change);
      setPriceChangePercent((change / asset.current) * 100);
      setIsPriceUp(change >= 0);

      // Add new candle data
      setCandleData(prev => {
        const newCandle: CandleData = {
          time: Date.now(),
          open: prev[prev.length - 1]?.close || newPrice,
          high: Math.max(prev[prev.length - 1]?.close || newPrice, newPrice),
          low: Math.min(prev[prev.length - 1]?.close || newPrice, newPrice),
          close: newPrice,
          volume: Math.random() * 1000 + 100
        };
        
        return [...prev.slice(-99), newCandle]; // Keep last 100 candles
      });
    }, 2000);

    return () => clearInterval(priceInterval);
  }, [selectedAsset]);

  // Draw chart on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || candleData.length === 0) return;
                
                const ctx = canvas.getContext('2d');
                if (!ctx) return;
                
    const width = canvas.width;
    const height = canvas.height;
    const theme = themes[chartSettings.theme];

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Set background
    ctx.fillStyle = theme.background;
    ctx.fillRect(0, 0, width, height);

    // Calculate price range
    const prices = candleData.flatMap(candle => [candle.high, candle.low]);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice;

    // Draw grid lines
    if (chartSettings.showGrid) {
      ctx.strokeStyle = theme.grid;
                ctx.lineWidth = 1;
      for (let i = 0; i <= 5; i++) {
        const y = (height * i) / 5;
                  ctx.beginPath();
                  ctx.moveTo(0, y);
        ctx.lineTo(width, y);
                  ctx.stroke();
                }
    }

    // Draw candlesticks
    const candleWidth = width / candleData.length * 0.8;
    const candleSpacing = width / candleData.length;

    candleData.forEach((candle, index) => {
      const x = index * candleSpacing + candleSpacing * 0.1;
      const isGreen = candle.close >= candle.open;
      
      // Calculate y positions
      const openY = height - ((candle.open - minPrice) / priceRange) * height;
      const closeY = height - ((candle.close - minPrice) / priceRange) * height;
      const highY = height - ((candle.high - minPrice) / priceRange) * height;
      const lowY = height - ((candle.low - minPrice) / priceRange) * height;

      // Draw wick
      ctx.strokeStyle = isGreen ? theme.upColor : theme.downColor;
      ctx.lineWidth = 2;
                ctx.beginPath();
      ctx.moveTo(x + candleWidth / 2, highY);
      ctx.lineTo(x + candleWidth / 2, lowY);
                ctx.stroke();
                
      // Draw body
      ctx.fillStyle = isGreen ? theme.upColor : theme.downColor;
      const bodyHeight = Math.max(1, Math.abs(closeY - openY));
      const bodyY = Math.min(openY, closeY);
      ctx.fillRect(x, bodyY, candleWidth, bodyHeight);
    });

    // Draw current price line
    if (chartSettings.showPriceLine) {
      const currentPriceY = height - ((currentPrice - minPrice) / priceRange) * height;
      ctx.strokeStyle = theme.priceLine;
      ctx.lineWidth = 2;
                  ctx.setLineDash([5, 5]);
                  ctx.beginPath();
      ctx.moveTo(0, currentPriceY);
      ctx.lineTo(width, currentPriceY);
                  ctx.stroke();
      ctx.setLineDash([]);
    }

  }, [candleData, currentPrice, chartSettings]);

  const updateChartSetting = (setting: keyof ChartSettings, value: any) => {
    setChartSettings(prev => ({ ...prev, [setting]: value }));
  };

  return (
    <Card className="bg-[#181c27] border-[#2d3346] text-white">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <CardTitle className="text-lg font-bold text-white">{selectedAsset}</CardTitle>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-white">${currentPrice.toFixed(4)}</span>
              <Badge className={`${
                isPriceUp ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
              }`}>
                {isPriceUp ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                {isPriceUp ? '+' : ''}{priceChange.toFixed(4)} ({isPriceUp ? '+' : ''}{priceChangePercent.toFixed(2)}%)
              </Badge>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-blue-600 text-white">
              <Activity className="h-3 w-3 mr-1 animate-pulse" />
              LIVE
            </Badge>
            
            {/* Chart Settings Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <Settings className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-gray-800 border-gray-700">
                <DropdownMenuLabel className="text-white">Chart Settings</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-700" />
                
                <DropdownMenuItem 
                  onClick={() => updateChartSetting('theme', 'dark')}
                  className="text-white hover:bg-gray-700 focus:bg-gray-700"
                >
                  <Palette className="h-4 w-4 mr-2" />
                  Dark Theme
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => updateChartSetting('theme', 'light')}
                  className="text-white hover:bg-gray-700 focus:bg-gray-700"
                >
                  <Palette className="h-4 w-4 mr-2" />
                  Light Theme
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => updateChartSetting('theme', 'blue')}
                  className="text-white hover:bg-gray-700 focus:bg-gray-700"
                >
                  <Palette className="h-4 w-4 mr-2" />
                  Blue Theme
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => updateChartSetting('theme', 'green')}
                  className="text-white hover:bg-gray-700 focus:bg-gray-700"
                >
                  <Palette className="h-4 w-4 mr-2" />
                  Green Theme
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => updateChartSetting('theme', 'red')}
                  className="text-white hover:bg-gray-700 focus:bg-gray-700"
                >
                  <Palette className="h-4 w-4 mr-2" />
                  Red Theme
                </DropdownMenuItem>
                
                <DropdownMenuSeparator className="bg-gray-700" />
                
                <DropdownMenuItem 
                  onClick={() => updateChartSetting('showGrid', !chartSettings.showGrid)}
                  className="text-white hover:bg-gray-700 focus:bg-gray-700"
                >
                  <Grid3X3 className="h-4 w-4 mr-2" />
                  {chartSettings.showGrid ? 'Hide Grid' : 'Show Grid'}
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => updateChartSetting('showPriceLine', !chartSettings.showPriceLine)}
                  className="text-white hover:bg-gray-700 focus:bg-gray-700"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  {chartSettings.showPriceLine ? 'Hide Price Line' : 'Show Price Line'}
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => updateChartSetting('showVolume', !chartSettings.showVolume)}
                  className="text-white hover:bg-gray-700 focus:bg-gray-700"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  {chartSettings.showVolume ? 'Hide Volume' : 'Show Volume'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
                </div>
                </div>
      </CardHeader>
      <CardContent>
        {/* Asset Selector */}
        <div className="flex items-center space-x-2 mb-4 overflow-x-auto">
          {assets.map((asset) => (
            <Button
              key={asset.name}
              variant="ghost"
              size="sm"
              onClick={() => setSelectedAsset(asset.name)}
              className={`${
                selectedAsset === asset.name
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-[#1a1d2a] text-gray-300 hover:bg-[#2d3346]'
              } border border-[#2d3346] whitespace-nowrap`}
            >
              <div className="text-left">
                <div className="text-xs font-medium">{asset.name}</div>
                <div className={`text-xs ${
                  asset.change >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {asset.change >= 0 ? '+' : ''}{asset.changePercent.toFixed(2)}%
                </div>
              </div>
            </Button>
          ))}
            </div>

        {/* Timeframe Selector */}
        <div className="flex items-center space-x-2 mb-4">
          {timeframes.map((tf) => (
            <Button
              key={tf.value}
              variant="ghost"
              size="sm"
              onClick={() => setTimeframe(tf.value)}
              className={`${
                timeframe === tf.value
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-[#1a1d2a] text-gray-300 hover:bg-[#2d3346]'
              } border border-[#2d3346]`}
            >
              {tf.label}
            </Button>
          ))}
                </div>

        {/* Chart Canvas */}
        <div className="relative bg-[#181c27] rounded-lg border border-[#2d3346] overflow-hidden">
          <canvas
            ref={canvasRef}
            width={800}
            height={400}
            className="w-full h-[400px]"
          />
          
          {/* Chart Overlay Info */}
          <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-3">
            <div className="text-xs text-gray-400">O: ${candleData[candleData.length - 1]?.open.toFixed(4) || '0.0000'}</div>
            <div className="text-xs text-gray-400">H: ${candleData[candleData.length - 1]?.high.toFixed(4) || '0.0000'}</div>
            <div className="text-xs text-gray-400">L: ${candleData[candleData.length - 1]?.low.toFixed(4) || '0.0000'}</div>
            <div className="text-xs text-gray-400">C: ${candleData[candleData.length - 1]?.close.toFixed(4) || '0.0000'}</div>
                </div>
              </div>

        {/* Volume Bar */}
        <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center space-x-4">
            <span>Volume: {candleData[candleData.length - 1]?.volume.toFixed(0) || '0'}</span>
            <span>Change: {isPriceUp ? '+' : ''}{priceChange.toFixed(4)}</span>
            </div>
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span>Last updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TradingChart;