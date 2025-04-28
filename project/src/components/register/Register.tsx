import React, { useState } from 'react';
import { UserPlus, Mail, Lock, User } from 'lucide-react';
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
} from './registerStyles';

const backendUrl = import.meta.env.VITE_API_URL;

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${backendUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'username': name,
          'email': email,
          'password': password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Cadastro realizado com sucesso!');
        // Após cadastro, redireciona para login
        window.location.href = '/login';
      } else {
        alert(data.detail || 'Erro ao fazer cadastro');
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
            <UserPlus className="w-8 h-8 text-indigo-600" />
          </IconContainer>
          <h2>Crie sua conta</h2>
          <p>Cadastre-se para agendar sua quadra</p>
        </Header>

        <form onSubmit={handleSubmit}>
          <InputGroup>
            <label>Nome</label>
            <InputWrapper>
              <IconWrapper>
                <User className="h-5 w-5 text-gray-400" />
              </IconWrapper>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome completo"
                required
              />
            </InputWrapper>
          </InputGroup>

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

          <Button type="submit">Cadastrar</Button>
        </form>
      </Card>
    </Container>
  );
};

export default Register;
