import styled from 'styled-components';

export const SidebarContainer = styled.div`
  width: 240px;
  background-color: #1f2937; // Tailwind gray-800 (profundo, mas não tão escuro)
  color: white;
  min-height: 100vh;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
`;

export const MenuGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
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
    background-color: #3b82f6; // Tailwind blue-500
  }
`;

export const LogoutButton = styled(MenuItem)`
  margin-top: auto;
  background-color: #ef4444; // Tailwind red-500
  color: white;

  &:hover {
    background-color: #dc2626; // Tailwind red-600
  }
`;
