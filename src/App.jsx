import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main style={{ paddingTop: '80px', minHeight: 'calc(100vh - 160px)', width: '100%' }}>
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
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
