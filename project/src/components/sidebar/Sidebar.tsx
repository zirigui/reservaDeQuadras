import React from 'react';
import {
    SidebarContainer,
    MenuItem,
    MenuGroup,
    LogoutButton
  } from './SidebarStyles';


interface SidebarProps {
  onNavigate: (screen: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onNavigate }) => {
  return (
    <SidebarContainer>
      
      <MenuGroup>
        <MenuItem onClick={() => onNavigate('admin')}>Admin</MenuItem>
        <MenuItem onClick={() => onNavigate('notices')}>Avisos</MenuItem>
        <MenuItem onClick={() => onNavigate('booking')}>Reservar quadra</MenuItem>
        <MenuItem onClick={() => onNavigate('myBookings')}>Meus agendamentos</MenuItem>
        <MenuItem onClick={() => onNavigate('notifications')}>Notificações</MenuItem>
      </MenuGroup>
      
      <MenuItem onClick={() => onNavigate('settings')}>Configurações</MenuItem>
      <LogoutButton onClick={() => onNavigate('logout')}>Sair</LogoutButton>
    </SidebarContainer>
  );
};

export default Sidebar;
