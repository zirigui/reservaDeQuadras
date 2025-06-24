import React from 'react';
import {
  SidebarContainer,
  MenuItem,
  FixedBottomButtons,
  SettingsButton,
  MenuGroup,
  LogoutButton
} from './SidebarStyles';

interface SidebarProps {
  onNavigate: (screen: string) => void;
  isAdmin: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ onNavigate, isAdmin }) => {
  return (
    <SidebarContainer>
      <MenuGroup>
        {isAdmin && <MenuItem onClick={() => onNavigate('admin')}>Admin</MenuItem>}
        <MenuItem onClick={() => onNavigate('notices')}>Avisos</MenuItem>
        <MenuItem onClick={() => onNavigate('booking')}>Reservar quadra</MenuItem>
        <MenuItem onClick={() => onNavigate('myBookings')}>Meus agendamentos</MenuItem>
      </MenuGroup>
      <FixedBottomButtons>
        <SettingsButton onClick={() => onNavigate('settings')}>Configurações</SettingsButton>
        <LogoutButton onClick={() => onNavigate('logout')}>Sair</LogoutButton>
      </FixedBottomButtons>
    </SidebarContainer>
  );
};

export default Sidebar;
