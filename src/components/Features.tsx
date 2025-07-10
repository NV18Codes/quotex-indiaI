import { Shield, Zap, TrendingUp, Users, Award, Globe } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: 'Secure & Regulated',
      description: 'Licensed and regulated platform with advanced security protocols to protect your investments.',
      highlight: 'SSL Encrypted',
      color: 'blue'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Execute trades in milliseconds with our high-performance trading infrastructure.',
      highlight: '< 1ms Latency',
      color: 'yellow'
    },
    {
      icon: TrendingUp,
      title: 'High Returns',
      description: 'Earn up to 98% profit on successful binary options trades with competitive payouts.',
      highlight: 'Up to 98% ROI',
      color: 'green'
    },
    {
      icon: Users,
      title: '5M+ Traders',
      description: 'Join millions of active traders from around the world on our trusted platform.',
      highlight: '5M+ Users',
      color: 'purple'
    },
    {
      icon: Award,
      title: 'Award Winning',
      description: 'Recognized as the leading binary options platform with multiple industry awards.',
      highlight: 'Best Platform 2024',
      color: 'orange'
    },
    {
      icon: Globe,
      title: 'Global Markets',
      description: 'Trade 100+ assets including forex, crypto, stocks, and commodities 24/7.',
      highlight: '100+ Assets',
      color: 'indigo'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      yellow: 'bg-yellow-100 text-yellow-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600',
      indigo: 'bg-indigo-100 text-indigo-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Quotex?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of binary options trading with our cutting-edge platform 
            designed for both beginners and professional traders.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="relative group">
              <div className="bg-white rounded-xl border border-gray-200 p-8 h-full transition-all duration-300 hover:shadow-xl hover:border-blue-300 shadow-sm">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 ${getColorClasses(feature.color)} rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-200`}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>
                    <div className={`inline-flex items-center px-3 py-1 ${getColorClasses(feature.color)} text-sm font-medium rounded-full`}>
                      {feature.highlight}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-8 border border-gray-200">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">$2.4B+</div>
              <div className="text-gray-600">Daily Volume</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">150+</div>
              <div className="text-gray-600">Countries</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">99.9%</div>
              <div className="text-gray-600">Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;