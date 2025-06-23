import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [notices, setNotices] = useState<Notice[]>([]);
  const [newCourtName, setNewCourtName] = useState('');
  const [newCourtType, setNewCourtType] = useState('');
  const [newNotice, setNewNotice] = useState('');
  const [editCourtId, setEditCourtId] = useState<number | null>(null);
  const [editCourtName, setEditCourtName] = useState('');
  const [editCourtType, setEditCourtType] = useState('');
  const [editNoticeId, setEditNoticeId] = useState<number | null>(null);
  const [editNoticeMessage, setEditNoticeMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser || !JSON.parse(storedUser).admin) {
      navigate('/');
      return;
    }

    loadCourts();
    loadNotices();
  }, []);

  const loadCourts = async () => {
    try {
      const res = await fetch(`${backendUrl}/quadras`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (Array.isArray(data)) setCourts(data);
    } catch (err) {
      console.error('Erro ao carregar quadras:', err);
    }
  };

  const loadNotices = async () => {
    try {
      const res = await fetch(`${backendUrl}/avisos`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (Array.isArray(data)) setNotices(data);
    } catch (err) {
      console.error('Erro ao carregar avisos:', err);
    }
  };

  const handleAddCourt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourtName || !newCourtType) return;
    try {
      const res = await fetch(`${backendUrl}/quadras`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name: newCourtName, type: newCourtType })
      });
      if (res.ok) {
        setNewCourtName('');
        setNewCourtType('');
        loadCourts();
        setModalMessage('Quadra cadastrada com sucesso!');
        setShowModal(true);
      }
    } catch (err) {
      console.error('Erro ao cadastrar quadra:', err);
    }
  };

  const handleEditCourt = (court: Court) => {
    setEditCourtId(court.id);
    setEditCourtName(court.name);
    setEditCourtType(court.type);
  };

  const handleSaveEditCourt = async (id: number) => {
    try {
      await fetch(`${backendUrl}/quadras/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name: editCourtName, type: editCourtType })
      });
      setEditCourtId(null);
      loadCourts();
      setModalMessage('Quadra atualizada!');
      setShowModal(true);
    } catch (err) {
      console.error('Erro ao atualizar quadra:', err);
    }
  };

  const handleDeleteCourt = async (id: number) => {
    if (!confirm('Tem certeza?')) return;
    try {
      await fetch(`${backendUrl}/quadras/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      loadCourts();
    } catch (err) {
      console.error('Erro ao excluir quadra:', err);
    }
  };

  const handleAddNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch(`${backendUrl}/avisos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ message: newNotice })
      });
      setNewNotice('');
      loadNotices();
      setModalMessage('Aviso publicado!');
      setShowModal(true);
    } catch (err) {
      console.error('Erro ao publicar aviso:', err);
    }
  };

  const handleEditNotice = (notice: Notice) => {
    setEditNoticeId(notice.id);
    setEditNoticeMessage(notice.message);
  };

  const handleSaveEditNotice = async () => {
    try {
      await fetch(`${backendUrl}/avisos/${editNoticeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ message: editNoticeMessage })
      });
      setEditNoticeId(null);
      loadNotices();
      setModalMessage('Aviso atualizado!');
      setShowModal(true);
    } catch (err) {
      console.error('Erro ao editar aviso:', err);
    }
  };

  const handleDeleteNotice = async (id: number) => {
    if (!confirm('Tem certeza?')) return;
    try {
      await fetch(`${backendUrl}/avisos/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      loadNotices();
    } catch (err) {
      console.error('Erro ao excluir aviso:', err);
    }
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
        {courts.map(court => (
          <CourtCard key={court.id}>
            {editCourtId === court.id ? (
              <CardContent>
                <Label>Nome:</Label>
                <Input value={editCourtName} onChange={(e) => setEditCourtName(e.target.value)} />
                <Label>Tipo:</Label>
                <Input value={editCourtType} onChange={(e) => setEditCourtType(e.target.value)} />
                <ActionGroup>
                  <Button onClick={() => handleSaveEditCourt(court.id)}>Salvar</Button>
                  <Button onClick={() => setEditCourtId(null)}>Cancelar</Button>
                </ActionGroup>
              </CardContent>
            ) : (
              <>
                <CardContent>
                  <h3>{court.name}</h3>
                  <p>{court.type}</p>
                </CardContent>
                <ActionGroup>
                  <Button onClick={() => handleEditCourt(court)}>Editar</Button>
                  <Button onClick={() => handleDeleteCourt(court.id)}>Excluir</Button>
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
        {notices.map(notice => (
          <NoticeCard key={notice.id}>
            {editNoticeId === notice.id ? (
              <>
                <NoticeTextArea
                  value={editNoticeMessage}
                  onChange={(e) => setEditNoticeMessage(e.target.value)}
                />
                <ActionGroup>
                  <Button onClick={handleSaveEditNotice}>Salvar</Button>
                  <Button onClick={() => setEditNoticeId(null)}>Cancelar</Button>
                </ActionGroup>
              </>
            ) : (
              <>
                <p>{notice.message}</p>
                <ActionGroup>
                  <Button onClick={() => handleEditNotice(notice)}>Editar</Button>
                  <Button onClick={() => handleDeleteNotice(notice.id)}>Excluir</Button>
                </ActionGroup>
              </>
            )}
          </NoticeCard>
        ))}
      </NoticeCardContainer>

      {showModal && <Modal message={modalMessage} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default AdminScreen;
