import React, { useState, useEffect } from 'react';
import {
  CourtCardContainer,
  CourtCard,
  CardContent,
  ActionGroup,
  Button,
  Form,
  Input,
  Label,
  SectionTitle,
  NoticeCardContainer,
  NoticeCard,
  NoticeTextArea
} from './adminStyles';
import Modal from '../modal/returnModal';

interface Court {
  id: number;
  name: string;
  type: string;
}

interface Notice {
  id: number;
  message: string;
}

const backendUrl = import.meta.env.VITE_API_URL;

const AdminScreen: React.FC = () => {
  const [courts, setCourts] = useState<Court[]>([]);
  const [newCourtName, setNewCourtName] = useState('');
  const [newCourtType, setNewCourtType] = useState('');
  const [editCourtId, setEditCourtId] = useState<number | null>(null);
  const [editCourtName, setEditCourtName] = useState('');
  const [editCourtType, setEditCourtType] = useState('');

  const [notices, setNotices] = useState<Notice[]>([]);
  const [newNotice, setNewNotice] = useState('');
  const [editNoticeId, setEditNoticeId] = useState<number | null>(null);
  const [editNoticeMessage, setEditNoticeMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const token = localStorage.getItem('token');

  const loadCourts = async () => {
    try {
      const response = await fetch(`${backendUrl}/quadras`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (Array.isArray(data)) setCourts(data);
    } catch (error) {
      console.error('Erro ao carregar quadras:', error);
    }
  };

  const loadNotices = async () => {
    try {
      const response = await fetch(`${backendUrl}/avisos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (Array.isArray(data)) setNotices(data);
    } catch (error) {
      console.error('Erro ao carregar avisos:', error);
    }
  };

  useEffect(() => {
    loadCourts();
    loadNotices();
  }, []);

  const handleAddCourt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourtName || !newCourtType) {
      alert('Preencha todos os campos da quadra');
      return;
    }
    try {
      const response = await fetch(`${backendUrl}/quadras`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newCourtName, type: newCourtType }),
      });
      if (response.ok) {
        setNewCourtName('');
        setNewCourtType('');
        loadCourts();
        setModalMessage('Quadra cadastrada com sucesso!');
        setShowModal(true);
      }
    } catch (error) {
      console.error('Erro ao cadastrar quadra:', error);
    }
  };

  const handleEditCourt = (court: Court) => {
    setEditCourtId(court.id);
    setEditCourtName(court.name);
    setEditCourtType(court.type);
  };

  const handleSaveEditCourt = async (courtId: number) => {
    if (!editCourtName || !editCourtType) {
      alert('Preencha todos os campos para editar a quadra.');
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/quadras/${courtId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: editCourtName, type: editCourtType }),
      });
      if (response.ok) {
        setEditCourtId(null);
        setEditCourtName('');
        setEditCourtType('');
        loadCourts();
        setModalMessage('Quadra atualizada com sucesso!');
        setShowModal(true);
      }
    } catch (error) {
      console.error('Erro ao atualizar quadra:', error);
    }
  };

  const handleDeleteCourt = async (id: number) => {
    if (!confirm('Deseja mesmo excluir esta quadra?')) return;
    try {
      await fetch(`${backendUrl}/quadras/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      loadCourts();
    } catch (error) {
      console.error('Erro ao excluir quadra:', error);
    }
  };

  const handleAddNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNotice) {
      alert('Digite uma mensagem de aviso');
      return;
    }
    try {
      const response = await fetch(`${backendUrl}/avisos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: newNotice }),
      });
      if (response.ok) {
        setNewNotice('');
        loadNotices();
        setModalMessage('Aviso publicado com sucesso!');
        setShowModal(true);
      }
    } catch (error) {
      console.error('Erro ao publicar aviso:', error);
    }
  };

  const handleDeleteNotice = async (id: number) => {
    if (!confirm('Deseja mesmo excluir este aviso?')) return;
    try {
      await fetch(`${backendUrl}/avisos/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      loadNotices();
    } catch (error) {
      console.error('Erro ao excluir aviso:', error);
    }
  };

  const handleEditNotice = (notice: Notice) => {
    setEditNoticeId(notice.id);
    setEditNoticeMessage(notice.message);
  };

  const handleSaveEditNotice = async () => {
    if (!editNoticeMessage.trim()) return;
    try {
      const response = await fetch(`${backendUrl}/avisos/${editNoticeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: editNoticeMessage }),
      });
      if (response.ok) {
        setEditNoticeId(null);
        setEditNoticeMessage('');
        loadNotices();
        setModalMessage('Aviso atualizado com sucesso!');
        setShowModal(true);
      }
    } catch (error) {
      console.error('Erro ao editar aviso:', error);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      <SectionTitle>Cadastrar Nova Quadra</SectionTitle>
      <Form onSubmit={handleAddCourt}>
        <Label>Nome:</Label>
        <Input value={newCourtName} onChange={(e) => setNewCourtName(e.target.value)} required />
        <Label>Tipo:</Label>
        <Input value={newCourtType} onChange={(e) => setNewCourtType(e.target.value)} required />
        <Button type="submit">Cadastrar Quadra</Button>
      </Form>

      <SectionTitle>Quadras Cadastradas</SectionTitle>
      <CourtCardContainer>
        {courts.map((court) => (
          <CourtCard key={court.id}>
            {editCourtId === court.id ? (
              <CardContent>
                <Label>Nome:</Label>
                <Input value={editCourtName} onChange={(e) => setEditCourtName(e.target.value)} />
                <Label>Tipo:</Label>
                <Input value={editCourtType} onChange={(e) => setEditCourtType(e.target.value)} />
                <ActionGroup>
                  <Button onClick={() => handleSaveEditCourt(court.id)}>💾 Salvar</Button>
                  <Button onClick={() => setEditCourtId(null)}>❌ Cancelar</Button>
                </ActionGroup>
              </CardContent>
            ) : (
              <>
                <CardContent>
                  <h3>{court.name}</h3>
                  <p>{court.type}</p>
                </CardContent>
                <ActionGroup>
                  <Button onClick={() => handleEditCourt(court)}>✏️ Editar</Button>
                  <Button onClick={() => handleDeleteCourt(court.id)}>🗑️ Excluir</Button>
                </ActionGroup>
              </>
            )}
          </CourtCard>
        ))}
      </CourtCardContainer>

      <SectionTitle>Publicar Aviso</SectionTitle>
      <Form onSubmit={handleAddNotice}>
        <Label>Mensagem:</Label>
        <Input value={newNotice} onChange={(e) => setNewNotice(e.target.value)} required />
        <Button type="submit">Publicar Aviso</Button>
      </Form>

      <SectionTitle>Avisos Publicados</SectionTitle>
      <NoticeCardContainer>
        {notices.map((notice) => (
          <NoticeCard key={notice.id}>
            {editNoticeId === notice.id ? (
              <>
                <NoticeTextArea
                  value={editNoticeMessage}
                  onChange={(e) => setEditNoticeMessage(e.target.value)}
                />
                <ActionGroup>
                  <Button onClick={handleSaveEditNotice}>💾 Salvar</Button>
                  <Button onClick={() => setEditNoticeId(null)}>❌ Cancelar</Button>
                </ActionGroup>
              </>
            ) : (
              <>
                <p>{notice.message}</p>
                <ActionGroup>
                  <Button onClick={() => handleEditNotice(notice)}>✏️ Editar</Button>
                  <Button onClick={() => handleDeleteNotice(notice.id)}>🗑️ Excluir</Button>
                </ActionGroup>
              </>
            )}
          </NoticeCard>
        ))}
      </NoticeCardContainer>

      {showModal && <Modal message={modalMessage} onClose={handleModalClose} />}
    </div>
  );
};

export default AdminScreen;
