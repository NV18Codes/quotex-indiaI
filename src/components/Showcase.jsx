export default function Showcase() {
  const circularContent = [
    "Awareness",
    "Promotion/Sale", 
    "Celebration/Occasion",
    "Recognition"
  ];

  const rectangularContent = [
    "Birthday",
    "Product/Store Launch",
    "Event"
  ];

  return (
    <section className="px-8 py-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-blue-900 text-center mb-16 heading-font">
          Every message deserves a spotlight.
        </h2>
        
        <div className="relative">
          {/* Creative Diagonal Layout */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 relative">
            {circularContent.map((content, index) => (
              <div 
                key={index} 
                className={`relative transform ${
                  index === 0 ? 'rotate-6 translate-y-4' : 
                  index === 1 ? '-rotate-6 -translate-y-4' : 
                  index === 2 ? 'rotate-3 translate-y-2' : 
                  '-rotate-3 -translate-y-2'
                } transition-transform hover:scale-105`}
              >
                <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-xl border-4 border-white relative overflow-hidden">
                  <div className="text-center text-white font-bold text-sm md:text-base px-2">
                    {content}
                  </div>
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rounded-full shadow-lg"></div>
              </div>
            ))}
          </div>

          {/* Diagonal Connector Lines */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent transform -rotate-12"></div>
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent transform rotate-12"></div>

          {/* Rectangular Content in Diagonal Pattern */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {rectangularContent.map((content, index) => (
              <div 
                key={index} 
                className={`transform ${
                  index === 0 ? 'rotate-3 translate-y-2' : 
                  index === 1 ? '-rotate-2 -translate-y-1' : 
                  'rotate-1 translate-y-3'
                } transition-transform hover:scale-105`}
              >
                <div className="h-24 md:h-32 bg-gradient-to-br from-green-500 via-teal-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg border-2 border-white relative overflow-hidden">
                  <div className="text-center text-white font-bold text-lg md:text-xl px-4">
                    {content}
                  </div>
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-md"></div>
              </div>
            ))}
          </div>

          {/* Floating Elements */}
          <div className="absolute top-10 right-10 w-6 h-6 bg-yellow-400 rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute bottom-20 left-16 w-4 h-4 bg-pink-400 rounded-full opacity-60 animate-pulse delay-1000"></div>
          <div className="absolute top-1/3 left-8 w-3 h-3 bg-blue-400 rounded-full opacity-60 animate-pulse delay-500"></div>
        </div>
      </div>
    </section>
  );
}
