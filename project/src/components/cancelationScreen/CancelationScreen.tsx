import React, { useState, useEffect } from 'react';
import { Calendar, Clock, XCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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

interface Reservation {
  id: number;
  date: string;
  time: string;
  court: string;
  canCancel: boolean;
}
interface User {
  id: string;
  name: string;
  email: string;
}

interface CancellationScreenProps {
  onNavigate: (screen: string) => void;
  user: User;
}

const backendUrl = import.meta.env.VITE_API_URL;

const CancellationScreen: React.FC<CancellationScreenProps> = ({ onNavigate }) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const token = localStorage.getItem('token');

  // 1. Carrega reservas do usuário
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${backendUrl}/reservas`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setReservations(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Erro ao carregar reservas:', err);
      }
    };
    load();
  }, [token]);

  // 2. Cancela reserva e anima remoção
  const handleCancel = async (id: number) => {
    if (!confirm('Tem certeza que deseja cancelar esta reserva?')) return;

    try {
      const res = await fetch(`${backendUrl}/reserva/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        // dispara animação de saída
        setReservations((prev) => prev.filter((r) => r.id !== id));
      } else {
        const err = await res.json();
        alert(`Erro: ${err.detail}`);
      }
    } catch (err) {
      console.error('Erro ao cancelar reserva:', err);
      alert('Erro ao cancelar reserva');
    }
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
          <AnimatePresence>
            {reservations.map((reservation) => (
              <motion.div
                key={reservation.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                style={{ overflow: 'hidden' }}
              >
                <ReservationCard>
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
              </motion.div>
            ))}
          </AnimatePresence>
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
