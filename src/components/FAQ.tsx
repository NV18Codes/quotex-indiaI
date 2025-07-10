import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import AuthModal from './AuthModal';

const FAQ = () => {
  const [openItem, setOpenItem] = useState<number | null>(0);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const faqs = [
    {
      question: 'What are binary options?',
      answer: 'Binary options are financial instruments that allow you to predict whether the price of an asset will go up or down within a specified time frame. You earn a fixed payout if your prediction is correct.'
    },
    {
      question: 'How do I start trading?',
      answer: 'To start trading, simply create an account, deposit funds, choose an asset, set your investment amount and time frame, then predict whether the price will go up (CALL) or down (PUT).'
    },
    {
      question: 'What is the minimum deposit?',
      answer: 'The minimum deposit is $10, making it accessible for traders of all levels. You can start with small amounts and gradually increase your investments as you gain experience.'
    },
    {
      question: 'How fast are payouts processed?',
      answer: 'Payouts are processed instantly after each trade. Winning trades are credited to your account balance immediately, while losing trades are deducted from your investment amount.'
    },
    {
      question: 'Is the platform secure?',
      answer: 'Yes, we use bank-level SSL encryption to protect your data and funds. Our platform is licensed and regulated, ensuring the highest security standards for all transactions.'
    },
    {
      question: 'Can I trade on mobile?',
      answer: 'Absolutely! Our platform is fully responsive and works perfectly on all devices including smartphones and tablets. You can trade anywhere, anytime with our mobile-optimized interface.'
    }
  ];

  return (
    <>
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">
              Get answers to the most common questions about binary options trading
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-gray-700 text-white hover:bg-white hover:text-gray-700 px-8 py-3 text-lg font-semibold"
              >
                <User className="h-4 w-4 mr-2" />
                Get Started Today
              </Button>
              <Button variant="outline" className="bg-gray-700 text-white border-gray-600 hover:bg-white hover:text-gray-700 font-medium">
                Contact Support
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200">
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => setOpenItem(openItem === index ? null : index)}
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  {openItem === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {openItem === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
};

export default FAQ;