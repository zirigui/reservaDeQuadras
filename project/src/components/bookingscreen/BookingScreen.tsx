import React, { useState, useEffect } from 'react';
import {
  Container, Card, Header, Title,
  DateContainer, Content, CourtName,
  CourtType, CourtSection, CourtButton,
  SelectedIndicator, CourtList, SectionTitle,
  TimeSection, TimeButton, TimeGrid,
  ActionButtonContainer, ActionButton
} from './bookingScreenStyles';

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

interface BookingData {
  email: string;
  horario: string;
  quadra: Court;
}

interface BookingScreenProps {
  onNavigate: (screen: string, data?: BookingData) => void;
  user: User;
}

const backendUrl = import.meta.env.VITE_API_URL

const BookingScreen: React.FC<BookingScreenProps> = ({ onNavigate, user }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [courts, setCourts] = useState<Court[]>([]);

  // Carregar quadras do backend
  useEffect(() => {
    const loadCourts = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch(`${backendUrl}/quadras`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setCourts(data);
    };

    loadCourts();
  }, []);

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00'
  ];

  const handleBooking = async () => {
    if (!selectedCourt || !selectedTime) return;

    const horarioISO = new Date(
      selectedDate.toDateString() + ' ' + selectedTime
    ).toISOString();

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${backendUrl}/reserva`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          quadra: selectedCourt.id,
          horario: horarioISO
        })
      });

      if (!response.ok) {
        throw new Error('Erro ao fazer reserva');
      }

      const data = await response.json();

      onNavigate('confirmation', {
        email: user.email,
        horario: data.horario,
        quadra: selectedCourt
      });
    } catch (error) {
      alert('Erro ao confirmar reserva: ' + error);
    }
  };

  return (
    <Container>
      <Card>
        <Header>
          <Title>Agendar Quadra</Title>
          <DateContainer>
            <input
              type="date"
              value={selectedDate.toISOString().split('T')[0]}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
            />
          </DateContainer>
        </Header>

        <Content>
          <CourtSection>
            <SectionTitle>Selecione a Quadra</SectionTitle>
            <CourtList>
              {courts.map((court) => (
                <CourtButton
                  key={court.id}
                  onClick={() => setSelectedCourt(court)}
                  selected={selectedCourt?.id === court.id}
                >
                  <div>
                    <CourtName>{court.name}</CourtName>
                    <CourtType>{court.type}</CourtType>
                  </div>
                  {selectedCourt?.id === court.id && <SelectedIndicator />}
                </CourtButton>
              ))}
            </CourtList>
          </CourtSection>

          <TimeSection>
            <SectionTitle>Horários Disponíveis</SectionTitle>
            <TimeGrid>
              {timeSlots.map((time) => (
                <TimeButton
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  selected={selectedTime === time}
                >
                  {time}
                </TimeButton>
              ))}
            </TimeGrid>
          </TimeSection>
        </Content>

        <ActionButtonContainer>
          <ActionButton
            onClick={handleBooking}
            disabled={!selectedCourt || !selectedTime}
          >
            Confirmar Agendamento
          </ActionButton>
        </ActionButtonContainer>
      </Card>
    </Container>
  );
};

export default BookingScreen;
