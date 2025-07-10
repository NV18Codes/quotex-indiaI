import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openItem, setOpenItem] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What is binary options trading?',
      answer: 'Binary options trading involves predicting whether the price of an asset will go up or down within a specific time frame. If your prediction is correct, you earn a fixed payout. If incorrect, you lose your investment amount.'
    },
    {
      question: 'What is the minimum deposit required?',
      answer: 'You can start trading with as little as $10. We believe in making trading accessible to everyone, regardless of their initial capital.'
    },
    {
      question: 'How much can I earn from trading?',
      answer: 'Profits can range up to 98% of your investment amount on successful trades. However, trading involves risk and past performance does not guarantee future results.'
    },
    {
      question: 'Is QXBroker regulated and safe?',
      answer: 'Yes, QXBroker is fully licensed and regulated. We use advanced encryption technology to protect your personal and financial information, and all client funds are kept in segregated accounts.'
    },
    {
      question: 'What assets can I trade?',
      answer: 'We offer over 100 trading instruments including forex pairs, cryptocurrencies, stocks, commodities, and indices. You can trade major assets like BTC/USD, EUR/USD, Gold, Apple stocks, and many more.'
    },
    {
      question: 'How long do trades last?',
      answer: 'Trade durations range from 1 minute to several hours. You can choose short-term trades for quick profits or longer-term trades for more strategic positioning.'
    },
    {
      question: 'Can I trade on mobile?',
      answer: 'Yes, our platform is fully responsive and works perfectly on mobile devices. We also have dedicated mobile apps for iOS and Android for the best trading experience on the go.'
    },
    {
      question: 'How do I withdraw my profits?',
      answer: 'Withdrawals are processed quickly and securely. You can withdraw funds using the same method you used for deposits. Most withdrawals are processed within 24 hours.'
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-muted-foreground">
            Get answers to the most common questions about trading with QXBroker
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-card rounded-xl border border-border overflow-hidden">
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-muted/50 transition-colors"
              >
                <h3 className="text-lg font-semibold pr-4">{faq.question}</h3>
                {openItem === index ? (
                  <ChevronUp className="h-5 w-5 text-primary flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                )}
              </button>
              
              {openItem === index && (
                <div className="px-6 pb-4">
                  <div className="border-t border-border pt-4">
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-card rounded-xl border border-border p-8">
            <h3 className="text-xl font-semibold mb-4">Still have questions?</h3>
            <p className="text-muted-foreground mb-6">
              Our 24/7 support team is here to help you with any questions or concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Contact Support
              </button>
              <button className="px-6 py-3 border border-border rounded-lg font-medium hover:bg-muted/50 transition-colors">
                Live Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;