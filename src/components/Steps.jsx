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
    icon: "plan", 
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
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Steps */}
          <div>
            <h2 className="text-4xl font-bold text-blue-900 mb-12 heading-font">How to get started</h2>
            <div className="space-y-6">
              {steps.map((step, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    {step.icon === "billboard" ? (
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    ) : step.icon === "plan" ? (
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    ) : (
                      <img src={step.icon} alt={step.text} className="w-6 h-6" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-blue-900 text-lg">{step.text}</h3>
                    <p className="text-gray-600 mt-1">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Video Placeholder */}
          <div className="lg:pl-8 flex flex-col justify-center h-full">
            <p className="text-gray-700 text-lg mb-8 font-medium italic">
              AS EASY AS ADDING A PRODUCT TO CART — RENT OUR LED SCREENS IN MINUTES.
            </p>
            <div className="bg-gray-200 rounded-lg p-12 text-center relative overflow-hidden" style={{ minHeight: '400px' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 opacity-50"></div>
              <div className="relative z-10 flex flex-col justify-center h-full">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="w-10 h-10 text-blue-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <p className="text-gray-700 font-medium text-lg">Watch a quick video to understand how it works and get started instantly.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
