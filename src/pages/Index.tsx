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

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
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

export default Index;
