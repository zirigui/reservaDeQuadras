import React, { useState, useEffect } from 'react';
import {
  Container, Card, Header, Title,
  DateContainer, Content, CourtName,
  CourtType, CourtSection, CourtButton,
  SelectedIndicator, CourtList, SectionTitle,
  TimeSection, TimeButton, TimeGrid,
  ActionButtonContainer, ActionButton,
  ModalOverlay, ModalContent, ModalTitle,
  ModalText, ModalButton
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

const backendUrl = import.meta.env.VITE_API_URL;

const BookingScreen: React.FC<BookingScreenProps> = ({ onNavigate, user }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [courts, setCourts] = useState<Court[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const loadCourts = async () => {
      const token = localStorage.getItem('token');

      try {
        const res = await fetch(`${backendUrl}/quadras`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          if (res.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
            return;
          } else {
            throw new Error('Erro ao carregar quadras');
          }
        }

        const data = await res.json();
        if (Array.isArray(data)) {
          setCourts(data);
        } else {
          console.error('Resposta inesperada do backend:', data);
        }

      } catch (error) {
        console.error('Erro ao buscar quadras:', error);
      }
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

      await response.json();
      setShowModal(true);

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
              {Array.isArray(courts) && courts.length > 0 ? (
                courts.map((court) => (
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
                ))
              ) : (
                <p>Nenhuma quadra disponível no momento.</p>
              )}
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

      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>Agendamento Confirmado!</ModalTitle>
            <ModalText>Sua quadra foi reservada com sucesso.</ModalText>
            <ModalButton
              onClick={() => {
                setShowModal(false);
                onNavigate('myBookings');
              }}
            >
              OK
            </ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default BookingScreen;
