import styled from 'styled-components';

export const SidebarContainer = styled.div`
  width: 240px;
  background-color: #1e3a8a; // Tailwind gray-800
  color: white;
  min-height: 100vh;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
`;

export const MenuGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const FixedBottomButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: auto;
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
