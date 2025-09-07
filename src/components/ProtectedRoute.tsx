import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AccountTerminated from './AccountTerminated';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAuth();

  // If user is terminated, show termination screen
  if (user?.isTerminated) {
    return <AccountTerminated />;
  }

  // Otherwise, show the normal content
  return <>{children}</>;
};

export default ProtectedRoute;
