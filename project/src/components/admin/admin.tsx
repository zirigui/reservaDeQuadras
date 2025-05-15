import React, { useState, useEffect } from 'react';
import {
  CourtCardContainer,
  CourtCard,
  CardContent,
  ActionGroup,
  Button,
  Form,
  Input,
  Label
} from './adminStyles';
import Modal from '../modal/returnModal';

interface Court {
  id: number;
  name: string;
  type: string;
}

const backendUrl = import.meta.env.VITE_API_URL;

const AdminScreen: React.FC = () => {
  const [courts, setCourts] = useState<Court[]>([]);
  const [newCourtName, setNewCourtName] = useState('');
  const [newCourtType, setNewCourtType] = useState('');
  const [newNotice, setNewNotice] = useState(''); // Novo aviso
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const token = localStorage.getItem('token');

  const loadCourts = async () => {
    try {
      const response = await fetch(`${backendUrl}/quadras`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setCourts(data);
      } else {
        console.error('A resposta da API não é um array válido:', data);
      }
    } catch (error) {
      console.error('Erro ao carregar quadras:', error);
    }
  };

  useEffect(() => {
    loadCourts();
  }, []);

  const handleEdit = (court: Court) => {
    alert(`Editar quadra: ${court.name}`);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir esta quadra?')) return;
    try {
      await fetch(`${backendUrl}/quadras/${id}`, {
        method: 'DELETE',
      });
      loadCourts();
    } catch (error) {
      console.error('Erro ao excluir quadra:', error);
    }
  };

  const handleAddCourt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourtName || !newCourtType) {
      alert('Por favor, preencha todos os campos');
      return;
    }
    try {
      const response = await fetch(`${backendUrl}/quadras`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: newCourtName,
          type: newCourtType,
        }),
      });

      if (response.ok) {
        setNewCourtName('');
        setNewCourtType('');
        loadCourts();
        setModalMessage('Quadra cadastrada com sucesso!');
        setShowModal(true);
      } else {
        console.error('Erro ao adicionar quadra');
      }
    } catch (error) {
      console.error('Erro ao adicionar quadra:', error);
    }
  };

  const handleAddNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNotice) {
      alert('Digite um aviso');
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/avisos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ message: newNotice }),
      });

      if (response.ok) {
        setNewNotice('');
        setModalMessage('Aviso publicado com sucesso!');
        setShowModal(true);
      } else {
        console.error('Erro ao publicar aviso');
      }
    } catch (error) {
      console.error('Erro ao publicar aviso:', error);
    }
  };

  const handleModalClose = (result: boolean) => {
    setShowModal(false);
    if (result) {
      console.log('Ação confirmada');
    }
  };

  return (
    <div>
      <h2>Cadastrar Nova Quadra</h2>
      <Form onSubmit={handleAddCourt}>
        <div>
          <Label htmlFor="courtName">Nome da Quadra:</Label>
          <Input
            id="courtName"
            type="text"
            value={newCourtName}
            onChange={(e) => setNewCourtName(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="courtType">Tipo de Quadra:</Label>
          <Input
            id="courtType"
            type="text"
            value={newCourtType}
            onChange={(e) => setNewCourtType(e.target.value)}
            required
          />
        </div>
        <Button type="submit">Cadastrar Quadra</Button>
      </Form>

      <h2>Publicar Aviso</h2>
      <Form onSubmit={handleAddNotice}>
        <div>
          <Label htmlFor="notice">Mensagem do Aviso:</Label>
          <Input
            id="notice"
            type="text"
            value={newNotice}
            onChange={(e) => setNewNotice(e.target.value)}
            required
          />
        </div>
        <Button type="submit">Publicar Aviso</Button>
      </Form>

      <CourtCardContainer>
        {courts.length === 0 ? (
          <p>Não há quadras cadastradas ainda.</p>
        ) : (
          courts.map((court) => (
            <CourtCard key={court.id}>
              <CardContent>
                <h3>{court.name}</h3>
                <p>{court.type}</p>
              </CardContent>
              <ActionGroup>
                <Button onClick={() => handleEdit(court)}>✏️ Editar</Button>
                <Button onClick={() => handleDelete(court.id)}>🗑️ Excluir</Button>
              </ActionGroup>
            </CourtCard>
          ))
        )}
      </CourtCardContainer>

      {showModal && (
        <Modal message={modalMessage} onClose={handleModalClose} />
      )}
    </div>
  );
};

export default AdminScreen;
