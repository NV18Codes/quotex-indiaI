export default function About() {
  return (
    <section className="px-8 py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - About Us */}
          <div>
            <h2 className="text-4xl font-bold text-blue-900 mb-6">About Us</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              ADSCREENHUB is an AdTech-enabled media buying platform and marketplace based in Bengaluru, India. 
              Our platform provides end-to-end ease to plan, book, and track outdoor advertising campaigns. 
              We make screen advertising planning and execution easier by offering a dashboard of outdoor 
              hoarding inventory for selecting, booking, and managing advertising campaign placements seamlessly. 
              By simplifying searching, filtering (by geography, rate, time) we bring transparency and accessibility 
              to compare rates and reach quickly—ideal for All: big brands, small advertisers, Campaigners and individuals.
            </p>
          </div>

          {/* Right Side - Design Inspiration */}
          <div className="bg-blue-50 rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-blue-900 mb-6 text-center">Need design inspiration?</h3>
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-gray-700 mb-4">Put your creative mind to work using AI</p>
                <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg">
                  CANVA
                </button>
              </div>
              
              <div className="text-center">
                <p className="text-gray-500 font-medium">or</p>
              </div>
              
              <div className="text-center">
                <p className="text-gray-700 mb-4">Let the professionals do it for you</p>
                <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg">
                  CALL US
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
