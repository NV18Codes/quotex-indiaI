import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Users, 
  TrendingUp, 
  Globe,
  Award,
  CheckCircle,
  Star,
  Clock,
  DollarSign,
  Target,
  Heart,
  Zap,
  ArrowRight
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  const stats = [
    { icon: Users, value: '50,000+', label: 'Active Traders', color: 'blue' },
    { icon: DollarSign, value: '$2.5B+', label: 'Trading Volume', color: 'green' },
    { icon: Globe, value: '150+', label: 'Countries', color: 'purple' },
    { icon: Award, value: '98%', label: 'Satisfaction Rate', color: 'orange' }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Security First',
      description: 'Your funds and data are protected with bank-level security measures and encryption.',
      color: 'blue'
    },
    {
      icon: Target,
      title: 'Transparency',
      description: 'We believe in complete transparency in our pricing, policies, and trading conditions.',
      color: 'green'
    },
    {
      icon: Heart,
      title: 'Customer Focus',
      description: 'Your success is our priority. We provide 24/7 support and personalized assistance.',
      color: 'red'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We continuously improve our platform with cutting-edge technology and features.',
      color: 'yellow'
    }
  ];

  const achievements = [
    {
      year: '2024',
      title: 'Platform Excellence Award',
      description: 'Recognized for outstanding trading platform innovation and user experience.',
      icon: Award
    },
    {
      year: '2023',
      title: 'Best Binary Options Broker',
      description: 'Awarded by Financial Times for exceptional service and competitive payouts.',
      icon: Star
    },
    {
      year: '2022',
      title: 'Customer Service Excellence',
      description: 'Achieved 98% customer satisfaction rate with 24/7 multilingual support.',
      icon: Heart
    },
    {
      year: '2021',
      title: 'Global Expansion',
      description: 'Successfully launched operations in 50+ new countries and regions.',
      icon: Globe
    }
  ];

  const team = [
    {
      name: 'Alex Morgan',
      position: 'CEO & Founder',
      bio: 'Experienced financial markets professional and platform innovator.',
      image: '/favicon.ico'
    },
    {
      name: 'Jordan Lee',
      position: 'CTO',
      bio: 'Technology leader specializing in trading systems and fintech.',
      image: '/favicon.ico'
    },
    {
      name: 'Taylor Smith',
      position: 'Head of Trading',
      bio: 'Expert in options and risk management.',
      image: '/favicon.ico'
    },
    {
      name: 'Morgan Brown',
      position: 'Head of Customer Success',
      bio: 'Dedicated to supporting every trader\'s journey.',
      image: '/favicon.ico'
    }
  ];

  const features = [
    {
      icon: CheckCircle,
      title: 'Regulated & Licensed',
      description: 'Fully regulated by international financial authorities'
    },
    {
      icon: CheckCircle,
      title: 'Instant Execution',
      description: 'Trades executed in milliseconds with no requotes'
    },
    {
      icon: CheckCircle,
      title: 'Competitive Payouts',
      description: 'Up to 98% payout on successful trades'
    },
    {
      icon: CheckCircle,
      title: '24/7 Trading',
      description: 'Trade anytime, anywhere with our mobile platform'
    },
    {
      icon: CheckCircle,
      title: 'Educational Resources',
      description: 'Comprehensive learning materials and webinars'
    },
    {
      icon: CheckCircle,
      title: 'Multi-Language Support',
      description: 'Available in 15+ languages worldwide'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600',
      red: 'bg-red-100 text-red-600',
      yellow: 'bg-yellow-100 text-yellow-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              <Star className="h-4 w-4 mr-2" />
              Trusted by 50,000+ Traders Worldwide
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              About <span className="text-yellow-300">Quotex</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto mb-8 leading-relaxed">
              We're a leading binary options trading platform dedicated to providing traders 
              with the tools, education, and support they need to succeed in the financial markets.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg">
                Start Trading
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className={`w-20 h-20 ${getColorClasses(stat.color)} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <stat.icon className="h-10 w-10" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
                Our Journey
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Our Story</h2>
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                <p>
                  Founded in 2018, <strong>Quotex</strong> was born from a simple vision: to make binary options 
                  trading accessible, transparent, and profitable for everyone. Our founders, 
                  experienced traders themselves, recognized the need for a platform that prioritized 
                  user education and fair trading conditions.
                </p>
                <p>
                  What started as a small team of passionate traders has grown into a global 
                  community of over <strong>50,000 active traders</strong>. We've processed over <strong>$2.5 billion</strong> in 
                  trading volume and expanded our services to traders in more than <strong>150 countries</strong>.
                </p>
                <p>
                  Today, we continue to innovate and improve our platform, always keeping our 
                  core values of security, transparency, and customer success at the heart of 
                  everything we do.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl h-96 flex items-center justify-center shadow-2xl">
                <div className="text-center text-white">
                  <Globe className="h-20 w-20 mx-auto mb-6 opacity-80" />
                  <h3 className="text-2xl font-bold mb-2">Global Trading Platform</h3>
                  <p className="text-blue-100">Connecting traders worldwide</p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                <TrendingUp className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6">
              Our Foundation
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core values guide everything we do and shape the experience we provide to our traders
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="bg-white border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 ${getColorClasses(value.color)} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <value.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-6">
              Recognition
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Achievements</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Recognition and milestones that demonstrate our commitment to excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {achievements.map((achievement, index) => (
              <Card key={index} className="bg-white border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <achievement.icon className="h-10 w-10 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-3 mb-4">
                        <Badge className="bg-purple-100 text-purple-800 text-sm font-semibold px-3 py-1">
                          {achievement.year}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{achievement.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{achievement.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium mb-6">
              Leadership
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experienced professionals dedicated to your trading success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="bg-white border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                <CardContent className="p-8 text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-lg">
                    <Users className="h-16 w-16 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-semibold mb-4">{member.position}</p>
                  <p className="text-gray-600 leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6">
              Why Choose Us
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Quotex?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover what makes us the preferred choice for binary options traders worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Join Our Trading Community
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
            Experience the difference that comes with trading on a platform built by traders, 
            for traders. Start your journey with Quotex today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-10 py-4 text-lg font-semibold shadow-lg">
              Open Account
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-10 py-4 text-lg font-semibold">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About; 