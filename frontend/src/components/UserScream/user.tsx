// src/components/Admin/admin.tsx

import { Typography, Box } from '@mui/material';
import Sidebar from '../SideBar/sidebar';

function UserPage() {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Conteúdo da página */}
      <Box sx={{ flexGrow: 1, mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4">Bem-vindo à página de Usuário!</Typography>
        <Typography>Você está logado como usuario.</Typography>
      </Box>
    </Box>
  );
}

export default  UserPage;
