import { useState } from 'react';
import Login from './components/login/Login';
import BookingScreen from './components/bookingscreen/BookingScreen';

interface User {
  id: string;
  name: string;
  email: string;
}

function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [user, setUser] = useState<User | null>(null);
  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentScreen('booking');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <Login onLogin={handleLogin} />;
        case 'booking':
          if (!user) {
            return <div>Você precisa estar logado para acessar esta tela.</div>;
          }
          return <BookingScreen onNavigate={setCurrentScreen} user={user} />;
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
