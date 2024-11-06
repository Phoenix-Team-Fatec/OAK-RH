import React from 'react';
import { Box, Typography } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import SidebarAdmin from '../ComponentsAdmin/SidebarAdmin/SidebarAdmin';
import AdminNavbar from './AdminNavbar';
import './DashAdmin.css';
import TabelaDashAdmin from './TabelaDashAdmin';
import TabelaFormularioDashAdmin from './tabelaFormularioDashAdmin';
import SmallCardChart from './SmallCardChart';

const Dashboard: React.FC = () => {
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
    <AdminNavbar/>
    <SidebarAdmin/>
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
