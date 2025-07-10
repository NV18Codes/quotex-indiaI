import { Button } from '@/components/ui/button';
import { Play, TrendingUp, Shield, Award } from 'lucide-react';

const Hero = () => {
  const features = [
    {
      icon: TrendingUp,
      title: 'High Returns',
      description: 'Up to 98% profit on successful trades'
    },
    {
      icon: Shield,
      title: 'Secure Trading',
      description: 'Advanced security protocols and regulation'
    },
    {
      icon: Award,
      title: 'Award Winning',
      description: 'Recognized trading platform with millions of users'
    }
  ];

  return (
    <section className="relative bg-gradient-to-br from-background via-background to-trading-bg-dark min-h-screen flex items-center">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Trade Binary Options with
                <span className="text-primary block">Confidence</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Join millions of traders on the world's leading binary options platform. 
                Start with just $10 and earn up to 98% profit.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-4">
                Start Trading Now
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                <Play className="h-5 w-5 mr-2" />
                Watch Demo
              </Button>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 pt-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Trading Preview */}
          <div className="relative">
            <div className="bg-card rounded-xl border border-border p-6 shadow-2xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Live Trading</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <span className="text-sm text-muted-foreground">Live</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-trading-surface rounded-lg p-4">
                    <div className="text-sm text-muted-foreground">BTC/USD</div>
                    <div className="text-xl font-bold text-trading-bull">$43,567.89</div>
                    <div className="text-sm text-trading-bull">+2.91%</div>
                  </div>
                  <div className="bg-trading-surface rounded-lg p-4">
                    <div className="text-sm text-muted-foreground">EUR/USD</div>
                    <div className="text-xl font-bold text-trading-bear">$1.0876</div>
                    <div className="text-sm text-trading-bear">-0.11%</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Investment</span>
                    <span>$100</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Potential Profit</span>
                    <span className="text-primary font-semibold">$98</span>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-trading-bull hover:bg-trading-bull/90">
                      CALL ↑
                    </Button>
                    <Button className="flex-1 bg-trading-bear hover:bg-trading-bear/90">
                      PUT ↓
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground rounded-full px-3 py-1 text-sm font-semibold">
              98% ROI
            </div>
            <div className="absolute -bottom-4 -left-4 bg-accent text-accent-foreground rounded-full px-3 py-1 text-sm font-semibold">
              $10 Min
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;