import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import useAuthStore from './store/authStore';

function App() {
  const { pathname } = useLocation();
  const { user } = useAuthStore();
  const showNavbar = user && pathname !== '/login';

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {showNavbar && <Navbar />}
      <main className="p-4 sm:p-6 lg:p-8 max-w-screen-2xl mx-auto">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/users" element={<ProtectedRoute allowedRoles={['ADMIN', 'HOST']}><UserManagement /></ProtectedRoute>} />
        </Routes>
      </main>
      <Toaster position="top-right" />
    </div>
  );
}

export default App
