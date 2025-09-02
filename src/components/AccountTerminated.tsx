import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Shield, FileX, Clock, Mail, Phone } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const AccountTerminated = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-gray-900 to-black flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-red-600 rounded-full">
              <AlertTriangle className="h-16 w-16 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-red-500 mb-4">ACCOUNT TERMINATED</h1>
          <div className="w-24 h-1 bg-red-500 mx-auto"></div>
        </div>

        {/* Main Termination Card */}
        <Card className="bg-gray-900 border-red-600 border-2 shadow-2xl">
          <CardContent className="p-8">
            {/* Official Notice */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Shield className="h-8 w-8 text-red-500" />
                <h2 className="text-2xl font-bold text-white">FOREX FEDERATION NOTICE</h2>
                <Shield className="h-8 w-8 text-red-500" />
              </div>
              
              <div className="bg-red-900/30 border border-red-600 rounded-lg p-6 mb-6">
                <p className="text-lg text-red-300 leading-relaxed">
                  <strong className="text-red-400">ACCOUNT TERMINATION NOTICE</strong>
                </p>
                <p className="text-white mt-4 leading-relaxed">
                  The Forex Federation has conducted a comprehensive review of your trading account and has found 
                  <strong className="text-red-400"> major violations of the terms and guidelines</strong> established 
                  by the Forex Federation regulatory framework.
                </p>
                <p className="text-white mt-4 leading-relaxed">
                  As a result of these violations, your trading account has been <strong className="text-red-400">permanently terminated</strong> 
                  effective immediately. This decision is final and non-appealable.
                </p>
              </div>
            </div>

            {/* Violation Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-800 border border-gray-600 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <FileX className="h-6 w-6 text-red-400" />
                  <h3 className="text-lg font-semibold text-white">Violations Identified</h3>
                </div>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• Multiple terms of service violations</li>
                  <li>• Unauthorized trading practices</li>
                  <li>• Regulatory compliance failures</li>
                  <li>• Account misuse and manipulation</li>
                </ul>
              </div>

              <div className="bg-gray-800 border border-gray-600 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="h-6 w-6 text-red-400" />
                  <h3 className="text-lg font-semibold text-white">Termination Details</h3>
                </div>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• Effective Date: {new Date().toLocaleDateString()}</li>
                  <li>• Termination Code: FF-2024-TERM-001</li>
                  <li>• Status: Permanent</li>
                  <li>• Appeal: Not Available</li>
                </ul>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-800 border border-gray-600 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-400" />
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
                <div>
                  <p><strong className="text-white">Forex Federation Compliance:</strong></p>
                  <p>Email: compliance@forexfederation.org</p>
                  <p>Phone: +1 (555) 123-4567</p>
                </div>
                <div>
                  <p><strong className="text-white">Legal Department:</strong></p>
                  <p>Email: legal@forexfederation.org</p>
                  <p>Phone: +1 (555) 987-6543</p>
                </div>
              </div>
            </div>

            {/* Final Notice */}
            <div className="text-center">
              <div className="bg-red-900/20 border border-red-600 rounded-lg p-6 mb-6">
                <p className="text-red-300 text-lg font-medium">
                  <strong>FINAL NOTICE:</strong> This account termination is permanent and irreversible. 
                  Any attempt to create new accounts or circumvent this termination will result in 
                  additional legal action.
                </p>
              </div>

              <Button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold text-lg"
              >
                Exit Platform
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            © 2024 Forex Federation. All rights reserved. | Regulatory Compliance Division
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountTerminated;
