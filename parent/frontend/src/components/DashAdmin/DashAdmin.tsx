import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import './DashAdmin.css';
import TabelaDashAdmin from './TabelaDashAdmin';
import SmallCardChart from './SmallCardChart';

const DashboardAdminGeral: React.FC<{ idAdmin: number }> = ({ idAdmin }) => {
  const [data3, setData3] = useState<{ name: string; value: number }[]>([]);

  // Função para buscar dados de formulários por mês
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/formularios/porMes/2`);
      console.log(response.data)
      
      setData3(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados de formulários por mês", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [idAdmin]);

  return (
    <Box className="dashboard-container">
      <Box className="top-cards">
        <Box className="small-card">
          <SmallCardChart title="Formulários Criados" data={data3} />
        </Box>
      </Box>
      <Box className="bottom-card">
        <TabelaDashAdmin />
      </Box>
    </Box>
  );
};

export default DashboardAdminGeral;
