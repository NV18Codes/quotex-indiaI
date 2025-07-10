import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, TrendingUp, Users, User } from 'lucide-react';
import { useState } from 'react';
import AuthModal from './AuthModal';

const CTA = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-gray-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
              Ready to Start Your Trading Journey?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join millions of traders and start earning with binary options today. 
              No experience required - we'll guide you every step of the way.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setIsAuthModalOpen(true)}
              className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3 text-lg font-semibold"
            >
              <User className="h-5 w-5 mr-2" />
              Start Trading Now
            </Button>
            <Button 
              variant="outline"
              className="bg-gray-700 text-white border-gray-600 hover:bg-white hover:text-gray-700 px-8 py-3 text-lg font-semibold"
            >
              Learn More
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 pt-8">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">100% Secure</h3>
              <p className="text-sm text-gray-600">Licensed & regulated platform</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">High Returns</h3>
              <p className="text-sm text-gray-600">Up to 98% profit potential</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900">5M+ Traders</h3>
              <p className="text-sm text-gray-600">Trusted worldwide</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="grid sm:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">$10</div>
                <div className="text-sm text-gray-600">Minimum Deposit</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">98%</div>
                <div className="text-sm text-gray-600">Max Payout</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">24/7</div>
                <div className="text-sm text-gray-600">Trading Hours</div>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-500 max-w-2xl mx-auto">
            By signing up, you agree to our Terms of Service and Privacy Policy. 
            Trading involves risk and may not be suitable for all investors.
          </p>
        </div>
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </section>
  );
};

export default CTA;