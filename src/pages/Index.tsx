import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TradingChart from '@/components/TradingChart';
import TradingPanel from '@/components/TradingPanel';
import AccountDashboard from '@/components/AccountDashboard';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Trophy, 
  TrendingUp, 
  DollarSign, 
  Activity, 
  Target,
  CreditCard,
  Download,
  Settings
} from 'lucide-react';


const TradingDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [liveBalance, setLiveBalance] = useState(user?.liveBalance || 0);




  // Generate mock market data
  const markets = [
    { symbol: 'EUR/USD', currentPrice: 1.0856, changePercent: 0.21, volume: 1250000 },
    { symbol: 'GBP/USD', currentPrice: 1.2647, changePercent: -0.14, volume: 890000 },
    { symbol: 'BTC/USD', currentPrice: 43250, changePercent: 2.98, volume: 2500000 },
    { symbol: 'XAU/USD', currentPrice: 2045, changePercent: 0.59, volume: 850000 }
  ];

  // Real-time balance updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveBalance(prev => {
        const fluctuation = (Math.random() - 0.5) * 100; // Small random fluctuation
        return Math.max(0, prev + fluctuation);
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);





  const quickStats = [
    {
      title: 'Total Trades',
      value: '0',
      change: 'No trades yet',
      isPositive: false,
      icon: Target
    },
    {
      title: 'Win Rate',
      value: '0%',
      change: 'No trades yet',
      isPositive: false,
      icon: TrendingUp
    },
    {
      title: 'Total P&L',
      value: '$0.00',
      change: 'No trades yet',
      isPositive: false,
      icon: DollarSign
    },
    {
      title: 'Live Balance',
      value: `$${liveBalance.toLocaleString()}`,
      change: 'Live updates',
      isPositive: true,
      icon: Activity
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      {/* Welcome Section */}
      <section className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Welcome back, {user?.name}!</h1>
              <p className="text-gray-400 mt-2">
                Ready to make your next trade? Current balance:
                <span className="font-semibold text-green-400 ml-1">
                  ${liveBalance.toLocaleString()}
                </span>
                <span className="text-xs text-gray-500 ml-2">(Live updates)</span>
              </p>
              <div className="flex items-center gap-4 mt-2">
                <Badge className="bg-blue-600 text-white">
                  <Trophy className="h-3 w-3 mr-1" />
                  New Trader
                </Badge>
                <Badge className="bg-green-600 text-white">
                  <DollarSign className="h-3 w-3 mr-1" />
                  ${liveBalance.toLocaleString()}
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">
                {new Date().toLocaleString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  timeZoneName: 'short'
                })}
              </div>
              <Badge className="bg-green-600 text-white mt-1">
                <Activity className="h-3 w-3 mr-1" />
                LIVE
              </Badge>
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Trading Layout: Chart (full width) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <TradingChart />
        </div>
        
        {/* Trading Statistics and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-4">
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button 
                  onClick={() => navigate('/withdrawal')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Withdrawal
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Statement
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Account Settings
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Trading Statistics */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-4">
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Trading Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {quickStats.map((stat, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 border border-gray-600 rounded-lg bg-gray-700">
                    <div>
                      <div className="text-sm text-gray-400">{stat.title}</div>
                      <div className="text-lg font-bold text-white">{stat.value}</div>
                      <div className={`text-xs mt-1 ${stat.isPositive ? 'text-green-400' : 'text-gray-400'}`}>{stat.change}</div>
                    </div>
                    <div className={`p-2 rounded-lg ${stat.isPositive ? 'bg-green-900/20' : 'bg-gray-600'}`}>
                      <stat.icon className={`h-4 w-4 ${stat.isPositive ? 'text-green-400' : 'text-gray-400'}`} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Trading Panel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TradingPanel />
      </div>

      {/* Market Overview */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Market Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {markets.slice(0, 4).map((market, index) => (
              <div key={index} className="p-4 border border-gray-600 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold text-white">{market.symbol}</div>
                  <div className={`text-sm ${market.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {market.changePercent >= 0 ? '+' : ''}{market.changePercent.toFixed(2)}%
                  </div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  {market.symbol.includes('USD') && !market.symbol.includes('BTC') && !market.symbol.includes('ETH') 
                    ? market.currentPrice.toFixed(4) 
                    : market.currentPrice.toFixed(2)}
                </div>
                <div className="text-sm text-gray-400">
                  Vol: {market.volume >= 1000000 ? `${(market.volume / 1000000).toFixed(1)}M` : `${(market.volume / 1000).toFixed(1)}K`}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Footer />
    </div>
  );
};

const MarketingLanding = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
};

const IndexContent = () => {
  const { isAuthenticated } = useAuth();
  
  return isAuthenticated ? <TradingDashboard /> : <MarketingLanding />;
};

const Index = () => {
  return <IndexContent />;
};

export default Index;
