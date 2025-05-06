import styled from 'styled-components';

export const SidebarContainer = styled.div`
  width: 240px;
  background-color: #111827; // Tailwind gray-900
  color: white;
  min-height: 100vh;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const MenuItem = styled.button`
  background: none;
  border: none;
  color: inherit;
  text-align: left;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  transition: background 0.2s;

  &:hover {
    background-color: #1f2937; // Tailwind gray-800
  }
`;