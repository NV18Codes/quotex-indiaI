import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MarketTicker from '@/components/MarketTicker';
import TradingChart from '@/components/TradingChart';
import TradingPanel from '@/components/TradingPanel';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import AccountDashboard from '@/components/AccountDashboard';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

const IndexContent = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {isAuthenticated && <AccountDashboard />}
      <Hero />
      <MarketTicker />
      <TradingChart />
      <TradingPanel />
      <Features />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
};

const Index = () => {
  return (
    <AuthProvider>
      <IndexContent />
    </AuthProvider>
  );
};

export default Index;
