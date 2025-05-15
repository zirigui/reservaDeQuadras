// AvisosStyles.ts
import styled from 'styled-components';

export const AvisosContainer = styled.div`
  padding: 2rem;
`;

export const AvisoCard = styled.div`
  background-color: #ffffff;
  border-left: 5px solid #3b82f6; /* azul destaque */
  border-radius: 10px;
  padding: 1rem 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.01);
  }
`;

export const AvisoTexto = styled.p`
  font-size: 1rem;
  color: #333;
  margin: 0;
`;
