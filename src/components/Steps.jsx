import upload from "../assets/icons/upload.svg";
import calendar from "../assets/icons/calendar.svg";
import location from "../assets/icons/location.svg";
import approve from "../assets/icons/approve.svg";

const steps = [
  { 
    icon: calendar, 
    text: "SELECT DATE & LOCATION",
    description: "Choose when and where you want your ad to appear"
  },
  { 
    icon: location, 
    text: "CHOOSE EXPOSURE PLAN",
    description: "Select the right plan for your campaign goals"
  },
  { 
    icon: upload, 
    text: "UPLOAD YOUR DESIGN",
    description: "Upload your creative content in the required format"
  },
  { 
    icon: approve, 
    text: "GET YOUR DESIGN APPROVED",
    description: "Our team reviews and approves your content"
  },
  { 
    icon: "billboard", 
    text: "MAKE YOURSELF KNOWN",
    description: "Your ad goes live on our LED screens"
  },
];

export default function Steps() {
  return (
    <section className="px-8 py-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Steps */}
          <div>
            <h2 className="text-4xl font-bold text-blue-900 mb-8">How to get started</h2>
            <div className="space-y-6">
              {steps.map((step, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    {step.icon === "billboard" ? (
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    ) : (
                      <img src={step.icon} alt={step.text} className="w-6 h-6" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-blue-900 text-lg">{step.text}</h3>
                    <p className="text-gray-600 mt-1">{step.description}</p>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Video Placeholder */}
          <div className="lg:pl-8">
            <p className="text-gray-700 text-lg mb-6 font-medium">
              AS EASY AS ADDING A PRODUCT TO CART — RENT OUR LED SCREENS IN MINUTES.
            </p>
            <div className="bg-gray-200 rounded-lg p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 opacity-50"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-blue-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <p className="text-gray-700 font-medium">Watch a quick video to understand how it works and get started instantly.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
