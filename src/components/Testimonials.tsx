import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Professional Trader',
      avatar: 'SJ',
      content: 'QXBroker has transformed my trading experience. The platform is intuitive, fast, and the returns are excellent. I\'ve been consistently profitable for over 8 months now.',
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
      content: 'QXBroker\'s analysis tools helped me improve my win rate significantly. The platform is reliable and payouts are always processed quickly.',
      rating: 5,
      profit: '+$9,230'
    }
  ];

  return (
    <section className="py-20 bg-trading-bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">What Our Traders Say</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of successful traders who trust QXBroker for their binary options trading
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-card rounded-xl border border-border p-6 relative">
              <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/20" />
              
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary font-semibold">
                  {testimonial.avatar}
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-accent fill-current" />
                ))}
              </div>

              <p className="text-muted-foreground mb-4 italic">
                "{testimonial.content}"
              </p>

              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  Total Profit
                </div>
                <div className="text-lg font-bold text-trading-bull">
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
                  <Star key={i} className="h-5 w-5 text-accent fill-current" />
                ))}
              </div>
              <span className="text-lg font-semibold">4.9/5</span>
              <span className="text-muted-foreground">(12,847 reviews)</span>
            </div>
            <div className="text-muted-foreground">
              Trusted by 5+ million traders worldwide
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;