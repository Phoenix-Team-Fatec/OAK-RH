import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Box, Typography } from '@mui/material';

interface SmallCardChartProps {
  data: { name: string; value: number }[];
  title: string;
}

const SmallCardChart: React.FC<SmallCardChartProps> = ({ data, title }) => {
  const [userCount, setUserCount] = useState<number | null>(null);

  useEffect(() => {
    // Simulação de chamada ao backend para buscar o número de usuários/colaboradores
    const fetchUserCount = async () => {
      // Aqui você faria a requisição real para o backend
      const response = await fetch('/api/colaboradores/count'); // Exemplo de endpoint
      const result = await response.json();
      setUserCount(result.count); // Presumindo que o backend retorna um objeto com { count: number }
    };

    fetchUserCount();
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        height: 150,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
      }}
    >
      <Typography variant="h6">{title}</Typography>
      {userCount !== null ? (
        <>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            {userCount}
          </Typography>
          <Typography variant="body2" sx={{ color: 'gray' }}>
            Últimos 30 dias
          </Typography>
        </>
      ) : (
        <Typography variant="body1">Carregando...</Typography>
      )}

      <ResponsiveContainer width="95%" height={100}>
        <LineChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#00FF00" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default SmallCardChart;