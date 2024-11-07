import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import SidebarAdmin from '../ComponentsAdmin/SidebarAdmin/SidebarAdmin';
import AdminNavbar from '../navabarAdmin/AdminNavbar';
import TabelaFormularioDashAdmin from './tabelaFormularioDashAdmin';
import TabelaDashAdminEquipe from './TabelaDashAdminEquipe';

const DashboardAdminEquipe: React.FC = () => {
  const [selectedForm, setSelectedForm] = useState<string | null>(null);

  const handleFormSelect = (formulario: string) => {
    setSelectedForm(formulario);
  };

  return (
    <>
      <AdminNavbar />
      <SidebarAdmin />
      <Box className="dashboard-container">
        
        {/* Cards Pequenos na Parte Superior */}
        <Box className="top-cards">
          <Box className="small-card" sx={{ height: '100px' }}>
            <Typography variant="h5">Membros</Typography>
            <Typography variant="body2">120</Typography>
          </Box>
          <Box className="small-card" sx={{ height: '100px' }}>
            <Typography variant="h5">Formulários Pendentes</Typography>
            <Typography variant="body2">40</Typography>
          </Box>
          <Box className="small-card" sx={{ height: '100px' }}>
            <Typography variant="h5">Formulários Respondidos</Typography>
            <Typography variant="body2">80</Typography>
          </Box>
        </Box>

        {/* Estrutura de Outros Cards (Parte Inferior) */}
        <Box className="bottom-cards">
        <Box className="thin-card">
            <TabelaFormularioDashAdmin onFormSelect={handleFormSelect} />
          </Box>
          <Box className="bottom-card">
            <TabelaDashAdminEquipe selectedForm={selectedForm} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DashboardAdminEquipe;
