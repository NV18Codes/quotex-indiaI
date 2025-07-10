import { Star, Quote, User } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';

const Testimonials = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Professional Trader',
      avatar: 'SJ',
      content: 'Quotex has transformed my trading experience. The platform is intuitive, fast, and the returns are excellent. I\'ve been consistently profitable for over 8 months now.',
      rating: 5,
      profit: '+$12,450'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Day Trader',
      avatar: 'MC',
      content: 'The real-time charts and analysis tools are top-notch. I love how quick the execution is - never missed a trade opportunity. Highly recommend for serious traders.',
      rating: 5,
      profit: '+$8,920'
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      role: 'Beginner Trader',
      avatar: 'ER',
      content: 'Started with just $100 and learned everything through their educational resources. The support team is amazing and always helps when I have questions.',
      rating: 5,
      profit: '+$2,340'
    },
    {
      id: 4,
      name: 'David Thompson',
      role: 'Crypto Trader',
      avatar: 'DT',
      content: 'Best binary options platform I\'ve used. The crypto trading options are extensive and the platform never lags even during high volatility periods.',
      rating: 5,
      profit: '+$15,670'
    },
    {
      id: 5,
      name: 'Lisa Wang',
      role: 'Forex Trader',
      avatar: 'LW',
      content: 'The forex pairs selection is impressive. I can trade all major and minor pairs with tight spreads. The mobile app is also excellent for trading on the go.',
      rating: 5,
      profit: '+$6,780'
    },
    {
      id: 6,
      name: 'James Wilson',
      role: 'Swing Trader',
      avatar: 'JW',
      content: 'Quotex\'s analysis tools helped me improve my win rate significantly. The platform is reliable and payouts are always processed quickly.',
      rating: 5,
      profit: '+$9,230'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Traders Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Join thousands of successful traders who trust Quotex for their binary options trading
          </p>
          <div className="flex justify-center">
            <Button
              onClick={() => setIsAuthModalOpen(true)}
              className="bg-gray-700 text-white hover:bg-white hover:text-gray-700 px-8 py-3 text-lg font-semibold"
            >
              <User className="h-4 w-4 mr-2" />
              Join Success Stories
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-xl border border-gray-200 p-6 relative shadow-sm hover:shadow-md transition-shadow duration-200">
              <Quote className="absolute top-4 right-4 h-8 w-8 text-blue-200" />
              
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                  {testimonial.avatar}
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>

              <p className="text-gray-600 mb-4 italic leading-relaxed">
                "{testimonial.content}"
              </p>

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Total Profit
                </div>
                <div className="text-lg font-bold text-green-600">
                  {testimonial.profit}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-lg font-semibold text-gray-900">4.9/5</span>
              <span className="text-gray-600">(12,847 reviews)</span>
            </div>
            <div className="text-gray-600">
              Trusted by 5+ million traders worldwide
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;