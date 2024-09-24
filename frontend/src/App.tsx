import React from 'react';
import Sidebar from './components/SideBar/sidebar'; // Importe o componente Sidebar
import { Box, Typography } from '@mui/material';

function App() {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Conteúdo Principal */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4">Bem-vindo ao Dashboard</Typography>
        <Typography>Conteúdo da página principal vai aqui.</Typography>
      </Box>
    </Box>
  );
}

export default App;
