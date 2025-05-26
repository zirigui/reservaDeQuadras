import styled from 'styled-components';

export const SidebarContainer = styled.div`
  width: 240px;
  background-color: #1f2937; // Tailwind gray-800
  color: white;
  min-height: 100vh;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const MenuGroup = styled.div`
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
  flex-grow: 1;
`;

export const FixedBottomButtons = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  border-top: 1px solid #374151;
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

export const SettingsButton = styled(MenuItem)`
  background: none;

  &:hover {
    background-color: #3b82f6; // Tailwind emerald-600
  }
`;

export const LogoutButton = styled(MenuItem)`
  background: none;

  &:hover {
    background-color: #3b82f6; // Tailwind red-600
  }
`;
