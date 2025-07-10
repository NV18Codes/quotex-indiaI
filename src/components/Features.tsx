import { Shield, Zap, TrendingUp, Users, Award, Globe } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: 'Secure & Regulated',
      description: 'Licensed and regulated platform with advanced security protocols to protect your investments.',
      highlight: 'SSL Encrypted'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Execute trades in milliseconds with our high-performance trading infrastructure.',
      highlight: '< 1ms Latency'
    },
    {
      icon: TrendingUp,
      title: 'High Returns',
      description: 'Earn up to 98% profit on successful binary options trades with competitive payouts.',
      highlight: 'Up to 98% ROI'
    },
    {
      icon: Users,
      title: '5M+ Traders',
      description: 'Join millions of active traders from around the world on our trusted platform.',
      highlight: '5M+ Users'
    },
    {
      icon: Award,
      title: 'Award Winning',
      description: 'Recognized as the leading binary options platform with multiple industry awards.',
      highlight: 'Best Platform 2024'
    },
    {
      icon: Globe,
      title: 'Global Markets',
      description: 'Trade 100+ assets including forex, crypto, stocks, and commodities 24/7.',
      highlight: '100+ Assets'
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Choose QXBroker?</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the future of binary options trading with our cutting-edge platform 
            designed for both beginners and professional traders.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="relative group">
              <div className="bg-card rounded-xl border border-border p-8 h-full transition-all duration-300 hover:shadow-xl hover:border-primary/20">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground mb-4">{feature.description}</p>
                    <div className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                      {feature.highlight}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div className="mt-16 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">$2.4B+</div>
              <div className="text-muted-foreground">Daily Volume</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">150+</div>
              <div className="text-muted-foreground">Countries</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Support</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-muted-foreground">Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;