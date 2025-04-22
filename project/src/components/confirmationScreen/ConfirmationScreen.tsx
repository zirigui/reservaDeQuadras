import React from 'react';
import { CheckCircle, Calendar, Clock, MapPin } from 'lucide-react';
import {
  Container,
  Card,
  Header,
  IconContainer,
  Details,
  DetailCard,
  Button,
  ButtonGroup
} from './confirmationScreenStyles';

interface Court {
  id: number;
  name: string;
  type: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

interface Reserva {
  horario: string; // Horário da reserva
  quadra: Court;  // Informações da quadra reservada
}

interface ConfirmationScreenProps {
  onNavigate: (screen: string) => void;
  user: User;
  reserva: Reserva;  // Usando a interface Reserva aqui
}

const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({ onNavigate, user, reserva }) => {
  return (
    <Container>
      <Card>
        <Header>
          <IconContainer>
            <CheckCircle className="w-10 h-10 text-green-500" />
          </IconContainer>
          <h2>Reserva Confirmada!</h2>
          <p>Um email de confirmação foi enviado para {user?.email}</p>
        </Header>

        <Details>
          <DetailCard>
            <Calendar className="w-6 h-6 text-gray-500 mr-3" />
            <div>
              <p>Data</p>
              <p className="font-medium">{new Date(reserva.horario).toLocaleDateString('pt-BR')}</p>
            </div>
          </DetailCard>

          <DetailCard>
            <Clock className="w-6 h-6 text-gray-500 mr-3" />
            <div>
              <p>Horário</p>
              <p className="font-medium">{new Date(reserva.horario).toLocaleTimeString('pt-BR')}</p>
            </div>
          </DetailCard>

          <DetailCard>
            <MapPin className="w-6 h-6 text-gray-500 mr-3" />
            <div>
              <p>Quadra</p>
              <p className="font-medium">{reserva.quadra.name} - {reserva.quadra.type}</p>
            </div>
          </DetailCard>
        </Details>

        <ButtonGroup>
          <Button
            onClick={() => onNavigate('booking')}
            bgColor="#4F46E5"
            hoverColor="#4338CA"
          >
            Fazer Nova Reserva
          </Button>

          <Button
            onClick={() => onNavigate('cancellation')}
            bgColor="#E5E7EB"
            hoverColor="#F3F4F6"
            textColor="#4B5563"
            borderColor="#D1D5DB"
          >
            Gerenciar Reservas
          </Button>
        </ButtonGroup>
      </Card>
    </Container>
  );
};

export default ConfirmationScreen;
