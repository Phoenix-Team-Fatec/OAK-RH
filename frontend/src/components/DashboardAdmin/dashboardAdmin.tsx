import React from 'react';
import TopMenu from '../Menu/menu'; // ajuste o caminho conforme necessário
import Sidebar from '../SideBar/sidebar';
import { Box } from '@mui/material';

const DashboardAdmin = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar fixa */}
      <Sidebar />

      {/* Conteúdo principal com o Menu e a dashboard */}
      <Box sx={{ flexGrow: 1 }}>
        <TopMenu />
        {/* Aqui você pode colocar o conteúdo principal do dashboard */}
        <Box sx={{ p: 2 }}>
          {/* Dashboard content */}
          <h1>Bem-vindo ao Dashboard Admin</h1>
          {/* Outras partes da sua dashboard */}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardAdmin;
