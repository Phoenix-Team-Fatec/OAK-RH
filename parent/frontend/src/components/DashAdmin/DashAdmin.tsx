import React from 'react';
import { Box, Typography } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import SidebarAdmin from '../SidebarAdmin/SidebarAdmin';
import AdminNavbar from './AdminNavbar';
import './DashAdmin.css';
import TabelaDashAdmin from './TabelaDashAdmin';
import TabelaFormularioDashAdmin from './tabelaFormularioDashAdmin';


const Dashboard: React.FC = () => {
  // Dados para os gráficos
  const data1 = [
    { name: 'Grupo A', value: 400 },
    { name: 'Grupo B', value: 300 },
    { name: 'Grupo C', value: 300 },
    { name: 'Grupo D', value: 200 },
  ];
  
  const data2 = [
    { name: 'Categoria X', value: 500 },
    { name: 'Categoria Y', value: 100 }, 
    { name: 'Categoria Z', value: 200 },
  ];
  
  const data3 = [
    { name: 'Segmento 1', value: 350 },
    { name: 'Segmento 2', value: 150 },
    { name: 'Segmento 3', value: 100 },
  ];
  
  const COLORS = ['#54334c', '#c46a7c', '#844164', '#e07b7b'];

  return (
    <>
    <AdminNavbar/>
    <SidebarAdmin/>
    <Box className="dashboard-container">
      <Box className="top-cards">
        <Box className="small-card">
          <Typography variant="h6">Colaboradores</Typography>
          <Typography variant="body2">150</Typography>
          
        </Box>
        <Box className="small-card">
          <Typography variant="h6">Equipes</Typography>
          <Typography variant="body2">27</Typography>
        </Box>
        <Box className="small-card">
          <Typography variant="h6">Formulários Criados</Typography>
          <Typography variant="body2">20</Typography>
        </Box>
      </Box>

      <Box className="middle-cards">
        <Box className="medium-card">
          <Typography variant="h6">Gráfico 1</Typography>
          <ResponsiveContainer width="100%" height="80%">
            <PieChart>
              <Pie
                data={data1}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data1.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>
        
        <Box className="medium-card">
          <Typography variant="h6">Gráfico 2</Typography>
          <ResponsiveContainer width="100%" height="80%">
            <PieChart>
              <Pie
                data={data2}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data2.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>

        <Box className="medium-card">
          <Typography variant="h6">Gráfico 3</Typography>
          <ResponsiveContainer width="100%" height="80%">
            <PieChart>
              <Pie
                data={data3}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data3.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Box>

                
      <Box className="bottom-cards">
      <Box className="bottom-card">
        <TabelaDashAdmin />
      </Box>

      </Box>
    </Box>
    </>
  );
};

export default Dashboard;
