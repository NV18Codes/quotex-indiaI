import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, TrendingUp, Users } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold">
              Ready to Start Your Trading Journey?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join millions of traders and start earning with binary options today. 
              No experience required - we'll guide you every step of the way.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-4">
              Create Free Account
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4">
              Try Demo Account
            </Button>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 pt-8">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">100% Secure</h3>
              <p className="text-sm text-muted-foreground">Licensed & regulated platform</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">High Returns</h3>
              <p className="text-sm text-muted-foreground">Up to 98% profit potential</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">5M+ Traders</h3>
              <p className="text-sm text-muted-foreground">Trusted worldwide</p>
            </div>
          </div>

          <div className="bg-card/50 backdrop-blur rounded-xl border border-border p-6">
            <div className="grid sm:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">$10</div>
                <div className="text-sm text-muted-foreground">Minimum Deposit</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">Max Payout</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Trading Hours</div>
              </div>
            </div>
          </div>

          <p className="text-xs text-muted-foreground max-w-2xl mx-auto">
            By signing up, you agree to our Terms of Service and Privacy Policy. 
            Trading involves risk and may not be suitable for all investors.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;