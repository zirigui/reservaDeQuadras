import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import BookingScreen from './components/bookingscreen/BookingScreen';
import Register from './components/register/Register';
import Sidebar from './components/sidebar/Sidebar';
import AdminScreen from './components/admin/admin';
import CancellationScreen from './components/cancelationScreen/CancelationScreen';
import NoticesScreen from './components/avisos/Avisos';

interface User {
  id: string;
  name: string;
  email: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Novo estado de carregamento

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // Finaliza o carregamento após verificar o localStorage
  }, []);

  const handleLogin = (userData: User) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const handleNavigate = (screen: string) => {
    if (screen === 'logout') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      window.location.href = '/login';
      return;
    }

    if (screen === 'booking') window.location.href = '/';
    if (screen === 'myBookings') window.location.href = '/my-bookings';
    if (screen === 'settings') window.location.href = '/settings';
    if (screen === 'admin') window.location.href = '/admin';
    if (screen === 'notices') window.location.href = '/avisos';
    if (screen === 'notifications') window.location.href = '/notifications';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Carregando...
      </div>
    );
  }

  return (
    <Router>
      {user ? (
        // Layout para usuários autenticados
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex">
          <Sidebar onNavigate={handleNavigate} />
          <div className="flex-1 p-4">
            <Routes>
              <Route path="/" element={<BookingScreen user={user} onNavigate={() => {}} />} />
              <Route path="/admin" element={<AdminScreen />} />
              <Route path="/avisos" element={<NoticesScreen />} />
              <Route path="/my-bookings" element={<CancellationScreen onNavigate={handleNavigate} user={user} />} />
              <Route path="/settings" element={<div>Configurações</div>} />
              <Route path="/login" element={<Navigate to="/" />} />
              <Route path="/register" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      ) : (
        // Layout para usuários não autenticados
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
          <div className="w-full max-w-md p-4">
            <Routes>
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </div>
        </div>
      )}
    </Router>
  );
}

export default App;
