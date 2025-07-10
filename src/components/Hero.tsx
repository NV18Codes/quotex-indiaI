import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, TrendingUp, Shield, Zap, Users, User, Play } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import AuthModal from './AuthModal';

const Hero = () => {
  const { isAuthenticated, user } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  if (isAuthenticated) {
    return null; // Don't show hero for authenticated users
  }

  const features = [
    {
      icon: TrendingUp,
      title: "Advanced Analytics",
      description: "Real-time charts and technical indicators for informed decisions"
    },
    {
      icon: Shield,
      title: "Secure Trading",
      description: "Bank-level security with encrypted transactions and data protection"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Execute trades in milliseconds with our high-performance platform"
    },
    {
      icon: Users,
      title: "24/7 Support",
      description: "Round-the-clock customer support to help you succeed"
    }
  ];

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          {/* Main Heading */}
          <div className="mb-8">
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 mb-6 px-4 py-2 text-sm font-medium">
              🚀 #1 Trading Platform in the US
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Trade with
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> Confidence</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience the future of trading with our advanced platform. 
              <span className="font-semibold text-gray-900"> Start with $10,000 demo account</span> and trade like a pro.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              onClick={() => setIsAuthModalOpen(true)}
              className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3 text-lg font-semibold"
            >
              <User className="h-5 w-5 mr-2" />
              Start Trading Now
            </Button>
            <Button
              onClick={() => setIsAuthModalOpen(true)}
              variant="outline"
              className="bg-gray-700 text-white border-gray-600 hover:bg-white hover:text-gray-700 px-8 py-3 text-lg font-semibold"
            >
              <Play className="h-5 w-5 mr-2" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">500K+</div>
              <div className="text-gray-600 font-medium">Active Traders</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">$2.5B+</div>
              <div className="text-gray-600 font-medium">Trading Volume</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">98%</div>
              <div className="text-gray-600 font-medium">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600 font-medium">Support</div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm mb-4">Trusted by traders worldwide</p>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <div className="text-gray-400 font-semibold">SEC Regulated</div>
            <div className="text-gray-400 font-semibold">•</div>
            <div className="text-gray-400 font-semibold">SSL Encrypted</div>
            <div className="text-gray-400 font-semibold">•</div>
            <div className="text-gray-400 font-semibold">24/7 Support</div>
          </div>
        </div>
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </section>
  );
};

export default Hero;