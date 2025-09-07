import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  Banknote, 
  User, 
  Phone, 
  MapPin, 
  CreditCard,
  ChevronDown,
  ArrowRight,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const Withdrawal = () => {
  const { user } = useAuth();
  const [withdrawalAmount, setWithdrawalAmount] = useState(() => {
    return user?.liveBalance?.toString() || '0';
  });
  const [currency, setCurrency] = useState('BTC');
  const [paymentMethod, setPaymentMethod] = useState('Cryptocurrency');
  const [isSubmitted, setIsSubmitted] = useState(() => {
    // Check localStorage for existing withdrawal status
    const savedStatus = localStorage.getItem('withdrawal_submitted');
    return savedStatus === 'true';
  });
  const [formData, setFormData] = useState({
    walletAddress: '',
    securityPin: '',
    walletVerification: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle withdrawal submission
    console.log('Withdrawal submitted:', { withdrawalAmount, currency, paymentMethod, formData });
    setIsSubmitted(true);
    // Save withdrawal status to localStorage
    localStorage.setItem('withdrawal_submitted', 'true');
  };

  // Function to clear withdrawal status (can be called when withdrawal is processed)
  const clearWithdrawalStatus = () => {
    setIsSubmitted(false);
    localStorage.removeItem('withdrawal_submitted');
  };

  const isFullBalanceWithdrawal = parseFloat(withdrawalAmount) === (user?.liveBalance || 0);
  const isAmountValid = parseFloat(withdrawalAmount) > 0 && isFullBalanceWithdrawal;
  const hasValidWalletAddress = formData.walletAddress && formData.walletAddress.length > 10;
  const hasValidSecurityPin = formData.securityPin && formData.securityPin.length === 6;
  const hasValidWalletVerification = formData.walletVerification && formData.walletVerification === formData.walletAddress;

  const faqItems = [
    {
      question: 'How to withdraw money from the account?',
      answer: 'Fill out the withdrawal form with your details and payment method. The funds will be processed within 1-3 business days.'
    },
    {
      question: 'How long does it take to withdraw funds?',
      answer: 'Withdrawals are typically processed within 1-3 business days, depending on your payment method.'
    },
    {
      question: 'What is the minimum withdrawal amount?',
      answer: 'Minimum withdrawal amount is $10 for USD and ₹100 for INR.'
    },
    {
      question: 'Is there any fee for depositing or withdrawing funds from the account?',
      answer: 'No fees are charged for deposits or withdrawals. All processing fees are covered by the platform.'
    },
    {
      question: 'Do I need to provide any documents to make a withdrawal?',
      answer: 'For INR withdrawals, Aadhaar verification is mandatory as per Indian regulations. For USD withdrawals, standard KYC documents may be required.'
    },
    {
      question: 'What is account verification?',
      answer: 'Account verification is a security process to confirm your identity and prevent fraud.'
    },
    {
      question: 'How to understand that I need to go through account verification?',
      answer: 'You will receive a notification when verification is required. This is mandatory for withdrawals above certain amounts.'
    },
    {
      question: 'How long does the verification process take?',
      answer: 'Verification typically takes 24-48 hours once all documents are submitted.'
    },
    {
      question: 'How do I know that I successfully passed verification?',
      answer: 'You will receive an email confirmation and your account status will be updated to "Verified".'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      
      {/* Page Header */}
      <div className="bg-gray-800 border-b border-gray-700 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Cryptocurrency Withdrawal</h1>
              <p className="text-gray-400 mt-2">Transfer your entire balance to your secure cryptocurrency wallet</p>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-gray-400 mb-1">
                Available for withdrawal: <span className="text-white font-bold text-lg">${user?.liveBalance?.toFixed(2) || '0.00'}</span>
              </div>
              <div className="text-sm text-gray-400">
                In the account: <span className="text-white font-bold text-lg">${user?.liveBalance?.toFixed(2) || '0.00'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Account Summary */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Crypto Account Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                <span className="text-gray-300">Total Balance:</span>
                <span className="text-white font-bold text-lg">{user?.liveBalance?.toFixed(6) || '0.000000'} BTC</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                <span className="text-gray-300">Available for withdrawal:</span>
                <span className="text-white font-bold text-lg">{user?.liveBalance?.toFixed(6) || '0.000000'} BTC</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                <span className="text-gray-300">Network Fee:</span>
                <span className="text-white font-bold text-lg">0.001 BTC</span>
              </div>
            </CardContent>
          </Card>

          {/* Crypto Withdrawal Form */}
          {!isSubmitted ? (
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Send Cryptocurrency
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6 p-4 bg-blue-900/20 border border-blue-600 rounded-lg">
                  <div className="text-sm text-blue-300">
                    <strong>Professional Crypto Withdrawal:</strong> Transfer your entire account balance to your secure cryptocurrency wallet. 
                    This transaction will be processed through our secure blockchain network with enterprise-grade security protocols.
                  </div>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                {/* To Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">To Address</label>
                  <div className="relative">
                    <Input
                      type="text"
                      name="walletAddress"
                      value={formData.walletAddress}
                      onChange={handleInputChange}
                      placeholder="Enter your cryptocurrency wallet address"
                      className="bg-gray-700 border-gray-600 text-white pr-10"
                      required
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-sm"></div>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Enter your secure cryptocurrency wallet address (e.g., Bitcoin, Ethereum, USDT)
                  </div>
                </div>

                {/* Amount to Send */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Amount to Send (USD)</label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      value={withdrawalAmount}
                      onChange={(e) => setWithdrawalAmount(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                      min="0"
                      step="0.01"
                      placeholder="Enter USD amount"
                    />
                    <div className="w-20 bg-gray-600 border border-gray-500 text-white flex items-center justify-center rounded-md">
                      USD
                    </div>
                  </div>
                  <div 
                    className="text-blue-400 text-sm mt-1 cursor-pointer hover:text-blue-300"
                    onClick={() => setWithdrawalAmount((user?.liveBalance || 0).toString())}
                  >
                    Send Entire Balance (${user?.liveBalance?.toFixed(2) || "0.00"} USD)
                  </div>
                  <div className="text-xs text-yellow-400 mt-1">
                    <strong>Required:</strong> You must withdraw your entire balance. Partial withdrawals are not allowed.
                  </div>
                </div>

                {/* Cryptocurrency Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Withdraw as Cryptocurrency</label>
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="BTC" className="text-white hover:bg-gray-600">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                          Bitcoin (BTC)
                        </div>
                      </SelectItem>
                      <SelectItem value="ETH" className="text-white hover:bg-gray-600">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                          Ethereum (ETH)
                        </div>
                      </SelectItem>
                      <SelectItem value="USDT" className="text-white hover:bg-gray-600">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                          Tether (USDT)
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="text-xs text-gray-400 mt-1">
                    Your USD balance will be converted to the selected cryptocurrency
                  </div>
                </div>

                {/* Network Fee */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Network Fee (USD)</label>
                  <Input
                    type="text"
                    value="5.00"
                    className="bg-gray-700 border-gray-600 text-white"
                    readOnly
                  />
                  <div className="text-xs text-gray-400 mt-1">
                    Standard blockchain network processing fee (approximately $5.00 USD)
                  </div>
                </div>

                {/* Conversion Display */}
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-300 mb-3">USD to {currency} Conversion</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">USD Amount:</span>
                      <span className="text-white">${withdrawalAmount || "0.00"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Network Fee:</span>
                      <span className="text-white">$5.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Exchange Rate (1 USD =):</span>
                      <span className="text-white">
                        {currency === 'BTC' ? '0.000023 BTC' : 
                         currency === 'ETH' ? '0.0004 ETH' : 
                         '1.00 USDT'}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-gray-600 pt-2">
                      <span className="text-gray-300 font-medium">You will receive:</span>
                      <span className="text-white font-bold">
                        {currency === 'BTC' ? `${((parseFloat(withdrawalAmount) || 0) - 5) * 0.000023} BTC` : 
                         currency === 'ETH' ? `${((parseFloat(withdrawalAmount) || 0) - 5) * 0.0004} ETH` : 
                         `${(parseFloat(withdrawalAmount) || 0) - 5} USDT`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Security Verification */}
                <div className="pt-4 border-t border-gray-600">
                  <h3 className="text-sm font-medium text-gray-300 mb-4">Security Verification</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Wallet Address Verification: <span className="text-red-400">*</span>
                      </label>
                      <Input
                        type="text"
                        name="walletVerification"
                        value={formData.walletVerification}
                        onChange={handleInputChange}
                        placeholder="Confirm your wallet address"
                        className="bg-gray-700 border-gray-600 text-white"
                        required
                      />
                      <div className="text-xs text-gray-400 mt-1">
                        Re-enter your wallet address for security verification
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Security PIN: <span className="text-red-400">*</span>
                      </label>
                      <Input
                        type="password"
                        name="securityPin"
                        value={formData.securityPin}
                        onChange={handleInputChange}
                        placeholder="Enter your 6-digit security PIN"
                        className="bg-gray-700 border-gray-600 text-white"
                        maxLength={6}
                        required
                      />
                      <div className="text-xs text-gray-400 mt-1">
                        Required for cryptocurrency transactions
                      </div>
                    </div>
                  </div>
                </div>

                {/* Validation Messages */}
                {!isFullBalanceWithdrawal && parseFloat(withdrawalAmount) > 0 && (
                  <div className="flex items-center gap-2 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    You must withdraw your entire balance: ${user?.liveBalance?.toFixed(2) || "0.00"} USD
                  </div>
                )}

                {!hasValidWalletAddress && formData.walletAddress && (
                  <div className="flex items-center gap-2 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    Please enter a valid cryptocurrency wallet address
                  </div>
                )}

                {!hasValidSecurityPin && formData.securityPin && (
                  <div className="flex items-center gap-2 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    Security PIN must be exactly 6 digits
                  </div>
                )}

                {!hasValidWalletVerification && formData.walletVerification && (
                  <div className="flex items-center gap-2 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    Wallet verification address must match the original address
                  </div>
                )}

                {/* Final Transaction Summary */}
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-300 mb-3">Final Transaction Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">USD Amount:</span>
                      <span className="text-white">${withdrawalAmount || "0.00"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Network Fee:</span>
                      <span className="text-white">$5.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Cryptocurrency:</span>
                      <span className="text-white">{currency}</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-600 pt-2">
                      <span className="text-gray-300 font-medium">You will receive:</span>
                      <span className="text-white font-bold">
                        {currency === 'BTC' ? `${((parseFloat(withdrawalAmount) || 0) - 5) * 0.000023} BTC` : 
                         currency === 'ETH' ? `${((parseFloat(withdrawalAmount) || 0) - 5) * 0.0004} ETH` : 
                         `${(parseFloat(withdrawalAmount) || 0) - 5} USDT`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={!isAmountValid || !hasValidWalletAddress || !hasValidSecurityPin || !hasValidWalletVerification}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2"
                >
                  Generate Transaction <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
          ) : (
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Withdrawal Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-green-300 mb-4">
                    <CheckCircle className="h-8 w-8 text-green-400" />
                    <div>
                      <h3 className="font-semibold text-xl">Cryptocurrency Transaction Submitted Successfully!</h3>
                      <p className="text-green-200 mt-1">
                        Your crypto withdrawal will be processed within 48hrs through our secure blockchain network. 
                        You will receive a confirmation email with transaction hash and blockchain explorer link.
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="text-sm text-gray-300">
                      <strong>Blockchain Processing:</strong> Your cryptocurrency transaction has been queued for processing. 
                      You cannot place another withdrawal request until the current blockchain transaction is confirmed.
                    </div>
                    <div className="text-xs text-gray-400 mt-2">
                      <strong>Status:</strong> This withdrawal status will automatically reset once your blockchain transaction is confirmed (typically within 48 hours).
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

        </div>
        

        
        {/* FAQ Section */}
        <div className="mt-12">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {faqItems.map((item, index) => (
                  <div key={index} className="p-4 border border-gray-600 rounded-lg bg-gray-700">
                    <div className="font-medium text-gray-200 mb-2">{item.question}</div>
                    <div className="text-sm text-gray-400">
                      {item.answer}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Withdrawal;