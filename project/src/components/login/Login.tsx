import React, { useState } from 'react';
import { LogIn, Mail, Lock } from 'lucide-react';
import {
  Container,
  Card,
  Header,
  IconContainer,
  InputGroup,
  InputWrapper,
  IconWrapper,
  Input,
  Button,
  } from './loginStyles';

interface UserData {
  id: string;
  name: string;
  email: string;
  access_token: string;
}

interface LoginProps {
  onLogin: (userData: UserData) => void;
}

const backendUrl = process.env.REACT_APP_API_URL

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${backendUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,
          password,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem('token', data.access_token);
        onLogin(data);
      } else {
        alert(data.detail || 'Erro ao fazer login');
      }
    } catch (error) {
      alert('Erro de conexão com o servidor');
      console.error(error);
    }
  };

  return (
    <Container>
      <Card>
        <Header>
          <IconContainer>
            <LogIn className="w-8 h-8 text-indigo-600" />
          </IconContainer>
          <h2>Bem-vindo</h2>
          <p>Faça login para agendar sua quadra</p>
        </Header>

        <form onSubmit={handleSubmit}>
          <InputGroup>
            <label>Email</label>
            <InputWrapper>
              <IconWrapper>
                <Mail className="h-5 w-5 text-gray-400" />
              </IconWrapper>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
              />
            </InputWrapper>
          </InputGroup>

          <InputGroup>
            <label>Senha</label>
            <InputWrapper>
              <IconWrapper>
                <Lock className="h-5 w-5 text-gray-400" />
              </IconWrapper>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </InputWrapper>
          </InputGroup>

          <Button type="submit">Entrar</Button>
        </form>
      </Card>
    </Container>
  );
};

export default Login;
