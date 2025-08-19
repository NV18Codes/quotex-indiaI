import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import MyOrders from './pages/MyOrders';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import DashboardOverview from './components/DashboardOverview';
import './styles.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, refreshAuthState } = useAuth();
  
  // Ensure authentication state is checked on mount
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      refreshAuthState();
    }
  }, [loading, isAuthenticated, refreshAuthState]);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Layout Component that conditionally shows footer
const Layout = ({ children }) => {
  const location = useLocation();
  const showFooter = !['/login', '/signup'].includes(location.pathname);
  
  return (
    <>
      <main style={{ paddingTop: '80px', minHeight: 'calc(100vh - 160px)', width: '100%' }}>
        {children}
      </main>
      {showFooter && <Footer />}
    </>
  );
};

// App Initialization Component
const AppInitializer = ({ children }) => {
  const { refreshAuthState, loading } = useAuth();

  useEffect(() => {
    // Force authentication state check on app initialization
    if (!loading) {
      console.log('App initializing, checking auth state...');
      refreshAuthState();
    }
  }, [loading, refreshAuthState]);

  return children;
};

function App() {
  return (
    <Router>
      <AppInitializer>
        <div className="App">
          <Navbar />
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardOverview />
                </ProtectedRoute>
              } />
              <Route path="/book-ad" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/my-orders" element={
                <ProtectedRoute>
                  <MyOrders />
                </ProtectedRoute>
              } />
              <Route path="/checkout" element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/pricing" element={<Home />} />
              <Route path="/how-it-works" element={<Home />} />
              <Route path="/about" element={<Home />} />
              <Route path="/blogs" element={<Home />} />
            </Routes>
          </Layout>
        </div>
      </AppInitializer>
    </Router>
  );
}

export default App;
