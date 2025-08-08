const plans = [
  {
    name: "SPARK",
    price: "₹ 4999",
    features: ["700 ad slots (10 sec/slot)", "1 day power play", "Quick visibility", "Occasion Focussed", "Moment Centric"],
  },
  {
    name: "IMPACT",
    price: "₹ 13999",
    features: ["2100 ad slots (10 sec/slot)", "3 day rapid reach", "Awareness Booster", "Momentum Gainer", "Weekend Blitz"],
  },
  {
    name: "THRIVE",
    price: "₹ 22999",
    features: ["3500 ad slots (10 sec/slot)", "5 day peak push", "Increased Exposure", "Lasting Recall", "Brand Amplification"],
  },
];

export default function Plans() {
  return (
    <section className="px-8 py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-blue-900 text-center mb-12">Our Plans</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div key={i} className="bg-blue-900 text-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow">
              <h3 className="text-3xl font-bold text-center mb-6">{plan.name}</h3>
              <div className="text-center mb-8">
                <p className="text-blue-200 text-sm mb-2">Starting @</p>
                <p className="text-4xl font-bold mb-1">{plan.price}</p>
                <p className="text-blue-200 text-sm">+GST</p>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="text-blue-100 text-sm flex items-start">
                    <span className="text-blue-300 mr-2">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-white text-blue-900 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors">
                Select Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
