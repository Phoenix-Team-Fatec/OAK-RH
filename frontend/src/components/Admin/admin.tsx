// src/components/Admin/admin.tsx
import React from 'react';
import { Typography, Box } from '@mui/material';

function AdminPage() {
  return (
    <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4">Bem-vindo à página do Admin!</Typography>
      <Typography>Você está logado como administrador.</Typography>
    </Box>
  );
}

export default AdminPage;
