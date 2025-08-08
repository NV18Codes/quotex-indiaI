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
        <h2 className="text-4xl font-bold text-blue-900 text-center mb-16">
          Every message deserves a spotlight.
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Circular Content */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-8 relative">
              {circularContent.map((content, index) => (
                <div key={index} className="relative">
                  <div className="w-48 h-48 bg-gradient-to-b from-blue-100 to-green-100 rounded-full flex items-center justify-center shadow-lg border-4 border-white relative overflow-hidden">
                    {/* Landscape Placeholder */}
                    <div className="w-full h-full relative">
                      <div className="absolute top-0 left-0 right-0 h-2/3 bg-gradient-to-b from-blue-200 to-blue-100"></div>
                      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-8 h-6 bg-white rounded-full opacity-80"></div>
                      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-green-300 to-green-200"></div>
                      <div className="absolute bottom-4 left-1/4 w-12 h-8 bg-green-400 rounded-full"></div>
                      <div className="absolute bottom-4 right-1/4 w-8 h-6 bg-green-300 rounded-full"></div>
                    </div>
                  </div>
                  <p className="text-center mt-4 font-semibold text-gray-800">{content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Rectangular Content */}
          <div className="space-y-6">
            {rectangularContent.map((content, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-32 h-20 bg-gradient-to-b from-blue-100 to-green-100 rounded-lg flex items-center justify-center shadow-md border-2 border-white relative overflow-hidden">
                  {/* Landscape Placeholder */}
                  <div className="w-full h-full relative">
                    <div className="absolute top-0 left-0 right-0 h-2/3 bg-gradient-to-b from-blue-200 to-blue-100"></div>
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-4 h-3 bg-white rounded-full opacity-80"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-green-300 to-green-200"></div>
                    <div className="absolute bottom-2 left-1/4 w-6 h-4 bg-green-400 rounded-full"></div>
                    <div className="absolute bottom-2 right-1/4 w-4 h-3 bg-green-300 rounded-full"></div>
                  </div>
                </div>
                <p className="font-semibold text-gray-800">{content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
