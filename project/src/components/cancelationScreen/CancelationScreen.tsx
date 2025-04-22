/*import React from 'react';
import { Calendar, Clock, XCircle, AlertCircle } from 'lucide-react';
import {
  Container,
  Wrapper,
  Header,
  Title,
  NewBookingButton,
  ReservationCard,
  CardRow,
  InfoGroup,
  CourtInfo,
  WarningText,
  CancelButton,
  EmptyState,
  IconWrapper,
  EmptyTitle,
  EmptyText
} from './cancelationScreenStyles';

interface CancellationScreenProps {
  onNavigate: (screen: string) => void;
  user: any;
}

const CancellationScreen: React.FC<CancellationScreenProps> = ({ onNavigate, user }) => {
  const reservations = [
    {
      id: 1,
      date: '15/03/2024',
      time: '14:00 - 15:00',
      court: 'Quadra 1 - Futsal',
      canCancel: true,
    },
    {
      id: 2,
      date: '20/03/2024',
      time: '16:00 - 17:00',
      court: 'Quadra 2 - Vôlei',
      canCancel: true,
    },
  ];

  const handleCancel = (id: number) => {
    alert('Reserva cancelada com sucesso!');
  };

  return (
    <Container>
      <Wrapper>
        <Header>
          <Title>Minhas Reservas</Title>
          <NewBookingButton onClick={() => onNavigate('booking')}>
            Nova Reserva
          </NewBookingButton>
        </Header>

        {reservations.length > 0 ? (
          <>
            {reservations.map((reservation) => (
              <ReservationCard key={reservation.id}>
                <CardRow>
                  <InfoGroup>
                    <Calendar size={20} color="#6b7280" />
                    <span style={{ fontWeight: 500 }}>{reservation.date}</span>
                  </InfoGroup>
                  <InfoGroup>
                    <Clock size={20} color="#6b7280" />
                    <span>{reservation.time}</span>
                  </InfoGroup>
                </CardRow>

                <CardRow>
                  <div>
                    <CourtInfo>{reservation.court}</CourtInfo>
                    {!reservation.canCancel && (
                      <WarningText>
                        <AlertCircle size={16} style={{ marginRight: 4 }} />
                        Cancelamento indisponível (menos de 24h)
                      </WarningText>
                    )}
                  </div>

                  <CancelButton
                    onClick={() => handleCancel(reservation.id)}
                    disabled={!reservation.canCancel}
                  >
                    <XCircle size={16} style={{ marginRight: 8 }} />
                    Cancelar
                  </CancelButton>
                </CardRow>
              </ReservationCard>
            ))}
          </>
        ) : (
          <EmptyState>
            <IconWrapper>
              <Calendar size={32} color="#9ca3af" />
            </IconWrapper>
            <EmptyTitle>Nenhuma reserva encontrada</EmptyTitle>
            <EmptyText>Você ainda não tem nenhuma reserva agendada.</EmptyText>
          </EmptyState>
        )}
      </Wrapper>
    </Container>
  );
};

export default CancellationScreen;
*/