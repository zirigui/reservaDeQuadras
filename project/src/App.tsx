import React, { useState } from 'react';
import { LogIn, Calendar, CheckCircle, XCircle, User, Clock, Mail } from 'lucide-react';
import Login from './components/Login';
import BookingScreen from './components/BookingScreen';
import ConfirmationScreen from './components/ConfirmationScreen';
import CancellationScreen from './components/CancellationScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentScreen('booking');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <Login onLogin={handleLogin} />;
      case 'booking':
        return <BookingScreen onNavigate={setCurrentScreen} user={user} />;
      case 'confirmation':
        return <ConfirmationScreen onNavigate={setCurrentScreen} user={user} />;
      case 'cancellation':
        return <CancellationScreen onNavigate={setCurrentScreen} user={user} />;
      default:
        return <Login onLogin={handleLogin} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {renderScreen()}
    </div>
  );
}

export default App;