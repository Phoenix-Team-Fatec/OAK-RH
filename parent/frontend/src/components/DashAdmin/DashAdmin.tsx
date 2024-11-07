import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import './DashAdmin.css';
import TabelaDashAdmin from './TabelaDashAdmin';
import SmallCardChart from './SmallCardChart';
import useUserData from '../../hooks/useUserData';

const DashboardAdminGeral: React.FC = () => {
  const [data3, setData3] = useState<{ name: string; value: number }[]>([]);
  const [data2, setData2] = useState<{ name: string; value: number }[]>([]);
  const [data1, setData1] = useState<{ name: string; value: number }[]>([]);
  const {id} = useUserData()
  
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/formularios/porMes/${id}`);
      console.log(id)
      setData3(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados de formulários por mês", error);
    }
  };

  const fetchDataEquipe = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/equipes/porMes/${id}`);
      console.log(id)
      setData2(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados de equipes por mês", error);
    }
  };

  const fetchDataUser = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/users/porMes/${id}`);
      console.log(id)
      setData1(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados de equipes por mês", error);
    }
  };
  

  useEffect(() => {
    fetchData();
    fetchDataEquipe();
    fetchDataUser();
  }, []);

  return (
    <Box className="dashboard-container">
      <Box className="top-cards">
        <Box className="small-card">
          <SmallCardChart title="Formulários Criados" data={data3} />
        </Box>
        <Box className="small-card">
          <SmallCardChart title="Equipes Criadas" data={data2} />
        </Box>
        <Box className="small-card">
          <SmallCardChart title="Usuarios Criados" data={data1} />
        </Box>
      </Box>
      <Box className="bottom-card">
        <TabelaDashAdmin />
      </Box>
    </Box>
  );
};

export default DashboardAdminGeral;
