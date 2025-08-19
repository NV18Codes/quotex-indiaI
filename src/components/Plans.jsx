const plans = [
  {
    name: "SPARK",
    price: "₹ 4,999",
    features: ["700 ad slots (10 sec/slot)", "1 day power play", "Quick visibility", "Occasion Focussed", "Moment Centric"],
  },
  {
    name: "IMPACT",
    price: "₹ 13,999",
    features: ["2100 ad slots (10 sec/slot)", "3 day rapid reach", "Awareness Booster", "Momentum Gainer", "Weekend Blitz"],
  },
  {
    name: "THRIVE",
    price: "₹ 22,999",
    features: ["3500 ad slots (10 sec/slot)", "5 day peak push", "Increased Exposure", "Lasting Recall", "Brand Amplification"],
  },
];

export default function Plans() {
  return (
    <section className="px-8 py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-6xl font-bold text-gray-800 text-center mb-16 heading-font">Our Plans</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div key={i} className="bg-gray-800 text-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow">
              <h3 className="text-3xl font-bold text-center mb-6">{plan.name}</h3>
              <div className="text-center mb-8">
                <p className="text-blue-300 text-sm mb-2">Starting @</p>
                <p className="text-6xl font-bold mb-1">{plan.price}</p>
                <p className="text-blue-300 text-sm">+GST</p>
              </div>
              <div className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="text-white text-sm text-center">
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
