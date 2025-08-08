export default function Contact() {
  return (
    <section className="px-8 py-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Contact Form */}
          <div className="bg-gray-100 rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Looking for a longer booking?</h2>
            <p className="text-gray-700 mb-6">
              Want to run a long-term campaign? Our team can create a solution just for you.
            </p>
            <div className="space-y-4">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg">
                CONTACT US
              </button>
            </div>
          </div>

          {/* Right Side - Company Info */}
          <div className="text-gray-800">
            <div className="flex items-center mb-6">
              <div className="bg-white text-blue-900 px-2 py-1 rounded text-sm font-bold mr-2">AD</div>
              <div className="text-2xl font-bold">SCREEN HUB</div>
            </div>
            <div className="flex gap-8 text-sm">
              <a href="#" className="hover:text-blue-600 transition-colors">FAQs</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Contact us</a>
              <a href="#" className="hover:text-blue-600 transition-colors">T&C</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
