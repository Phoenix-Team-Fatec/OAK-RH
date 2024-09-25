// src/components/Admin/admin.tsx

import { Typography, Box } from '@mui/material';
import Sidebar from '../SideBar/sidebar';

function AdminPage() {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Conteúdo da página */}
      <Box sx={{ flexGrow: 1, mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4">Bem-vindo à página do Admin!</Typography>
        <Typography>Você está logado como administrador.</Typography>
      </Box>
    </Box>
  );
}

export default AdminPage;
