import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './components/login/Login';
import BookingScreen from './components/bookingscreen/BookingScreen';
import Register from './components/register/Register';

interface User {
  id: string;
  name: string;
  email: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/booking"
            element={user ? <BookingScreen user={user} onNavigate={(screen, data) => console.log(screen, data)} /> : <div>Você precisa estar logado para acessar esta tela.</div>}
          />
          <Route path='/register' element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
