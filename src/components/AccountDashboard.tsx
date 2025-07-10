import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  DollarSign, 
  TrendingUp, 
  Clock, 
  Shield, 
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react';

const AccountDashboard = () => {
  const { 
    user, 
    switchAccount, 
    currentBalance, 
    currentTime, 
    isLiveBalanceVisible 
  } = useAuth();
  const [showBalance, setShowBalance] = useState(true);

  if (!user) return null;

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const getAccountTypeColor = () => {
    return user.accountType === 'live' ? 'bg-trading-bull' : 'bg-trading-surface';
  };

  const getBalanceDisplay = () => {
    if (user.accountType === 'demo') {
      return showBalance ? formatCurrency(currentBalance) : '****.**';
    }
    
    if (user.accountType === 'live') {
      if (!isLiveBalanceVisible) {
        return 'Available at 11:45 PM EST/PST';
      }
      return showBalance ? formatCurrency(currentBalance) : '****.**';
    }
    
    return '$0.00';
  };

  return (
    <div className="bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Account Info */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    Welcome back, {user.name}
                    <Badge className={getAccountTypeColor()}>
                      {user.accountType.toUpperCase()}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Manage your trading account and monitor performance
                  </CardDescription>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {currentTime}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {/* Balance Section */}
                <div className="bg-trading-surface rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Account Balance</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowBalance(!showBalance)}
                    >
                      {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  <div className="text-2xl font-bold">
                    {getBalanceDisplay()}
                  </div>
                  {user.accountType === 'live' && !isLiveBalanceVisible && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-yellow-500">
                      <AlertCircle className="h-4 w-4" />
                      Balance visible only at 11:45 PM
                    </div>
                  )}
                </div>

                {/* Account Type Switch */}
                <div className="bg-trading-surface rounded-lg p-4">
                  <h4 className="font-medium mb-3">Account Type</h4>
                  <div className="space-y-2">
                    <Button
                      variant={user.accountType === 'demo' ? 'default' : 'outline'}
                      className="w-full justify-start"
                      onClick={() => switchAccount('demo')}
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Demo Account ({formatCurrency(user.demoBalance)})
                    </Button>
                    <Button
                      variant={user.accountType === 'live' ? 'default' : 'outline'}
                      className="w-full justify-start"
                      onClick={() => switchAccount('live')}
                    >
                      <DollarSign className="h-4 w-4 mr-2" />
                      Live Account
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Trading Stats</CardTitle>
              <CardDescription>Today's performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Trades</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Win Rate</span>
                  <span className="font-semibold text-trading-bull">75%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">P&L</span>
                  <span className="font-semibold text-trading-bull">+$234.56</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Best Trade</span>
                  <span className="font-semibold">+$89.12</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4 text-trading-bull" />
                  Performance trending upward
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AccountDashboard;