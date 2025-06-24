import React, { useEffect, useState } from 'react';
import {
  Container,
  Wrapper,
  Header,
  Title,
  ModalOverlay,
  ModalContent,
  ModalTitle,
  ModalText,
  ModalButton
} from './settingsScreenStyles';

interface SettingsProps {
  onNavigate: (screen: string) => void;
}

const backendUrl = import.meta.env.VITE_API_URL;
const token = localStorage.getItem('token');

const SettingsScreen: React.FC<SettingsProps> = ({ onNavigate }) => {
  const [receiveEmails, setReceiveEmails] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const res = await fetch(`${backendUrl}/user/settings`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setReceiveEmails(data.receive_notifications);
      } catch (err) {
        console.error("Erro ao carregar configurações", err);
      }
    };
    loadSettings();
  }, []);

  const handleToggle = async () => {
    const newValue = !receiveEmails;
    setReceiveEmails(newValue);
    try {
      await fetch(`${backendUrl}/user/settings`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ receive_notifications: newValue })
      });
      setShowModal(true);
    } catch (err) {
      console.error("Erro ao atualizar configurações", err);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Header>
          <Title>Configurações</Title>
        </Header>

        <div style={{ marginTop: '2rem', fontSize: '1.1rem' }}>
          <label>
            <input
              type="checkbox"
              checked={receiveEmails}
              onChange={handleToggle}
              style={{ marginRight: '0.5rem' }}
            />
            Desejo receber e-mails de confirmação de reserva
          </label>
        </div>

        {showModal && (
          <ModalOverlay>
            <ModalContent>
              <ModalTitle>Configuração Atualizada!</ModalTitle>
              <ModalText>Sua preferência de e-mails foi salva com sucesso.</ModalText>
              <ModalButton onClick={() => setShowModal(false)}>OK</ModalButton>
            </ModalContent>
          </ModalOverlay>
        )}
      </Wrapper>
    </Container>
  );
};

export default SettingsScreen;
