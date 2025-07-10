import { Globe, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    'Trading': [
      'Binary Options',
      'Forex Trading',
      'Crypto Trading',
      'Stock Trading',
      'Commodities',
      'Indices'
    ],
    'Platform': [
      'Web Platform',
      'Mobile App',
      'API Trading',
      'Analysis Tools',
      'Economic Calendar',
      'Trading Signals'
    ],
    'Education': [
      'Trading Academy',
      'Video Tutorials',
      'eBooks',
      'Webinars',
      'Market Analysis',
      'Trading Strategies'
    ],
    'Support': [
      'Help Center',
      'Contact Us',
      'Live Chat',
      'Account Manager',
      'Technical Support',
      'Complaints'
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  return (
    <footer className="bg-trading-bg-dark border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-primary mb-4">QXBroker</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              The world's leading binary options trading platform. Trade with confidence 
              and join millions of successful traders worldwide.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <span>support@qxbroker.com</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Financial District, New York</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex space-x-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>

            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-muted-foreground">
              <span>Licensed & Regulated</span>
              <span className="hidden md:block">•</span>
              <span>SSL Secured</span>
              <span className="hidden md:block">•</span>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>

        {/* Legal Links */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2024 QXBroker. All rights reserved.
            </p>
            
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Risk Disclosure
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Cookies Policy
              </a>
            </div>
          </div>
        </div>

        {/* Risk Warning */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="bg-trading-surface rounded-lg p-4">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong>Risk Warning:</strong> Trading binary options involves substantial risk and may not be suitable for all investors. 
              You may sustain a loss of some or all of your invested capital and therefore you should not speculate with capital that you cannot afford to lose. 
              You should be aware of all the risks associated with binary options trading and seek advice from an independent financial advisor if you have any doubts.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;