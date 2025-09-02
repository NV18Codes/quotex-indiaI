import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ScrollToTop from './components/ScrollToTop';
import DynamicFavicon from './components/DynamicFavicon';
import ProtectedRoute from './components/ProtectedRoute';
import Index from './pages/Index';
import BinaryOptions from './pages/BinaryOptions';
import Markets from './pages/Markets';
import Education from './pages/Education';
import About from './pages/About';
import UserSettings from './pages/UserSettings';
import RecentTrades from './pages/RecentTrades';
import Withdrawal from './pages/Withdrawal';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <DynamicFavicon />
        <Routes>
          <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
          <Route path="/binary-options" element={<ProtectedRoute><BinaryOptions /></ProtectedRoute>} />
          <Route path="/markets" element={<ProtectedRoute><Markets /></ProtectedRoute>} />
          <Route path="/education" element={<ProtectedRoute><Education /></ProtectedRoute>} />
          <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><UserSettings /></ProtectedRoute>} />
          <Route path="/recent-trades" element={<ProtectedRoute><RecentTrades /></ProtectedRoute>} />
          <Route path="/withdrawal" element={<ProtectedRoute><Withdrawal /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
