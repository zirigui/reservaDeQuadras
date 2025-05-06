import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/login/Login';
import BookingScreen from './components/bookingscreen/BookingScreen';
import Register from './components/register/Register';
import Sidebar from './components/sidebar/Sidebar'; 

interface User {
  id: string;
  name: string;
  email: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
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
    if (screen === 'replays') window.location.href = '/replays';
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex">
        {user && <Sidebar onNavigate={handleNavigate} />}

        <div className="flex-1 p-4">
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route
              path="/"
              element={
                user ? (
                  <BookingScreen user={user} onNavigate={() => {}} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
