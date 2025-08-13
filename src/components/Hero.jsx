import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signup');
  };

  return (
    <section className="pt-20 min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/Banner.png" 
          alt="Hero Background" 
          className="w-full h-full object-cover opacity-50"
          onError={(e) => {
            console.error('Failed to load Banner.png');
            e.target.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-blue-900 bg-opacity-60"></div>
      </div>
      
      <div className="relative z-10 text-center text-white px-8 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Advertise big, Spend small
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-blue-100">
          Starting at just <span className="font-bold">₹7/ad</span>, Go <span className="font-bold text-yellow-300">BIG</span> with LED billboard advertising!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={handleGetStarted}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors shadow-lg"
          >
            Get Started
          </button>
          <button className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-full font-semibold text-lg transition-colors">
            Learn More
          </button>
        </div>
      </div>

      {/* Wave Separator */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12">
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            opacity=".25" 
            fill="#ffffff"
          ></path>
          <path 
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
            opacity=".5" 
            fill="#ffffff"
          ></path>
          <path 
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
            fill="#ffffff"
          ></path>
        </svg>
      </div>
    </section>
  );
}
