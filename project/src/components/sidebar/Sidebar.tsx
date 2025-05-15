import React from 'react';
import {
    SidebarContainer,
    MenuItem
  } from './SidebarStyles';


interface SidebarProps {
  onNavigate: (screen: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onNavigate }) => {
  return (
    <SidebarContainer>
      <MenuItem onClick={() => onNavigate('admin')}>Admin</MenuItem>
      <MenuItem onClick={() => onNavigate('notices')}>Avisos</MenuItem>
      <MenuItem onClick={() => onNavigate('booking')}>Reservar quadra</MenuItem>
      <MenuItem onClick={() => onNavigate('myBookings')}>Meus agendamentos</MenuItem>
      <MenuItem onClick={() => onNavigate('replays')}>Replays</MenuItem>
      <MenuItem onClick={() => onNavigate('logout')}>Sair</MenuItem>
    </SidebarContainer>
  );
};

export default Sidebar;
