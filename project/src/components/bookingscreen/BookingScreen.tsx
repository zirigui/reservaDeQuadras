import React, { useState, useEffect } from 'react';
import { sendReservationEmail } from '../../utils/sendEmail';
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
  const [occupiedTimes, setOccupiedTimes] = useState<string[]>([]);
  const isPastDate = selectedDate < new Date(new Date().setHours(0, 0, 0, 0));

  useEffect(() => {
    const fetchOccupiedTimes = async () => {
      if (!selectedCourt) return;
      const token = localStorage.getItem('token');
      const dateStr = selectedDate.toISOString().split('T')[0];

      try {
        const res = await fetch(`${backendUrl}/quadra/${selectedCourt.id}/horarios_ocupados?data=${dateStr}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Erro ao buscar horários ocupados');
        const data = await res.json();
        setOccupiedTimes(data);
      } catch (error) {
        console.error('Erro:', error);
      }
    };
    fetchOccupiedTimes();
  }, [selectedCourt, selectedDate]);

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

    const [year, month, day] = selectedDate.toISOString().split('T')[0].split('-');
    const [hour, minute] = selectedTime.split(':');

    const localDate = new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(minute),
      0
    );

    const horarioISO = localDate.toISOString();

    try {
      const token = localStorage.getItem('token');

      // 🔍 Verificar se o usuário quer receber e-mails
      const settingsRes = await fetch(`${backendUrl}/user/settings`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const settings = await settingsRes.json();
      const shouldSendEmail = settings.receive_notifications;

      // 📝 Criar reserva
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

      // 📧 Enviar email se estiver ativado
      if (shouldSendEmail) {
        const formattedDate = `${day}/${month}/${year}`;
        await sendReservationEmail(
          user.name,
          user.email,
          selectedCourt.name,
          formattedDate,
          selectedTime
        );
      }

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
              {timeSlots.map((time) => {
                const isOccupied = occupiedTimes.includes(time);
                const isDisabled = isOccupied || isPastDate;
                return (
                  <TimeButton
                    key={time}
                    onClick={() => !isDisabled && setSelectedTime(time)}
                    selected={selectedTime === time}
                    occupied={isDisabled}
                    disabled={isDisabled}
                  >
                    {time}
                  </TimeButton>
                );
              })}
            </TimeGrid>
          </TimeSection>
        </Content>

        <ActionButtonContainer>
          <ActionButton
            onClick={handleBooking}
            disabled={!selectedCourt || !selectedTime || isPastDate}
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
