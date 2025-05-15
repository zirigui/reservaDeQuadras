import React, { useEffect, useState } from 'react';
import { AvisosContainer, AvisoCard, AvisoTexto } from './AvisosStyles';

interface Notice {
  id: number;
  message: string;
}

const backendUrl = import.meta.env.VITE_API_URL;

const NoticesScreen: React.FC = () => {
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch(`${backendUrl}/avisos`);
        const data = await response.json();
        setNotices(data);
      } catch (error) {
        console.error('Erro ao buscar avisos:', error);
      }
    };

    fetchNotices();
  }, []);

  return (
    <AvisosContainer>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>📢 Avisos</h2>
      {notices.length === 0 ? (
        <p>Nenhum aviso disponível.</p>
      ) : (
        notices.map((notice) => (
          <AvisoCard key={notice.id}>
            <AvisoTexto>{notice.message}</AvisoTexto>
          </AvisoCard>
        ))
      )}
    </AvisosContainer>
  );
};

export default NoticesScreen;
