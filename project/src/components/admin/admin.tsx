import React, { useState, useEffect } from 'react';
import { CourtCardContainer, CourtCard, CardContent, ActionGroup, Button } from './adminStyles';

interface Court {
  id: number;
  name: string;
  type: string;
}

const backendUrl = import.meta.env.VITE_API_URL;

const AdminScreen: React.FC = () => {
  const [courts, setCourts] = useState<Court[]>([]);

  const loadCourts = async () => {
    try {
      const response = await fetch(`${backendUrl}/quadras`);
      const data = await response.json();
      setCourts(data);
    } catch (error) {
      console.error('Erro ao carregar quadras:', error);
    }
  };

  useEffect(() => {
    loadCourts();
  }, []);

  const handleEdit = (court: Court) => {
    // Função para editar a quadra
    alert(`Editar quadra: ${court.name}`);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir esta quadra?')) return;

    try {
      await fetch(`${backendUrl}/quadras/${id}`, {
        method: 'DELETE',
      });
      loadCourts(); // Recarrega a lista de quadras
    } catch (error) {
      console.error('Erro ao excluir quadra:', error);
    }
  };

  return (
    <CourtCardContainer>
      {courts.map((court) => (
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
      ))}
    </CourtCardContainer>
  );
};

export default AdminScreen;
