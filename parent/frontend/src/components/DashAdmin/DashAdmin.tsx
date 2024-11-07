import React from 'react';
import { Box } from '@mui/material';
import './DashAdmin.css';
import TabelaDashAdmin from './TabelaDashAdmin';
import SmallCardChart from './SmallCardChart';

const DashboardAdminGeral: React.FC = () => {
  // Dados para os gráficos
  const data1 = [
    { name: 'Grupo A', value: 100 },
    { name: 'Grupo B', value: 80 },
    { name: 'Grupo C', value: 30 },
    { name: 'Grupo D', value: 20 },
  ];
  
  const data2 = [
    { name: 'Categoria X', value: 50 },
    { name: 'Categoria Y', value: 30 },
    { name: 'Categoria Z', value: 80 },
    { name: 'Categoria Z', value: 80 },
    { name: 'Categoria Z', value: 100 },
    { name: 'Categoria Z', value: 50 },
  ];
  
  const data3 = [
    { name: 'Segmento 1', value: 35 },
    { name: 'Segmento 2', value: 15 },
    { name: 'Segmento 3', value: 50 },
  ];
  
  const COLORS = ['#54334c', '#c46a7c', '#844164', '#e07b7b'];

  return (
    <>
  
   
    <Box className="dashboard-container">
      <Box className="top-cards">
        <Box className="small-card">
         
          <SmallCardChart  title = "Colaboradores" data={data1} />
          
        </Box>
        <Box className="small-card">
          
          <SmallCardChart  title = "Equipes" data={data2} />
        </Box>
        <Box className="small-card">

          <SmallCardChart  title = "Formulários Criados" data={data3} />
        </Box>
      </Box>

      
        
        
      

                
     
      <Box className="bottom-card">
        <TabelaDashAdmin />
      </Box>

      </Box>
  
    </>
  );
};

export default DashboardAdminGeral;
