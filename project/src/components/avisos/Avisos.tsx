import React, { useEffect, useState } from 'react';

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
    <div>
      <h2>Avisos</h2>
      {notices.length === 0 ? (
        <p>Nenhum aviso disponível.</p>
      ) : (
        <ul>
          {notices.map((notice) => (
            <li key={notice.id}>{notice.message}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NoticesScreen;
