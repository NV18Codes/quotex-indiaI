import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signup');
  };

  return (
    <section className="pt-20 min-h-screen flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: '#1f2937' }}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/Banner.png" 
          alt="Hero Background" 
          className="w-full h-full object-cover opacity-30"
          onError={(e) => {
            console.error('Failed to load Banner.png');
            e.target.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gray-800 bg-opacity-70"></div>
      </div>
      
      <div className="relative z-10 text-center text-white px-8 max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight heading-font">
          Advertise big, Spend small
        </h1>
        <p className="text-2xl md:text-3xl mb-10 text-white">
          Starting at just <span className="font-bold">₹7/ad</span>, Go <span className="font-bold italic text-4xl md:text-5xl">BIG</span> with LED billboard advertising!
        </p>
        <div className="flex justify-center">
          <button 
            onClick={handleGetStarted}
            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-full font-semibold text-xl transition-colors shadow-lg"
          >
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
}
