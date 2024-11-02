import React, { useState } from 'react';
import { Box, Typography, FormControl, Select, MenuItem } from '@mui/material';
import './AdminNavbar.css';

const AdminNavbar: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState('Dashboard geral');

  const handleTeamChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedTeam(event.target.value as string);
  };

  return (
    <Box className="admin-navbar">
      <Typography variant="h6" className="navbar-title">{selectedTeam}</Typography>
      <FormControl variant="outlined" className="team-select">
        <Select value={selectedTeam} onChange={handleTeamChange} displayEmpty>
          <MenuItem value="Dashboard geral">Dashboard Geral</MenuItem>
          <MenuItem value="Desenvolvimento">Desenvolvimento</MenuItem>
          <MenuItem value="Financeiro">Financeiro</MenuItem>
          <MenuItem value="Admnistração">Admnistração</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default AdminNavbar;
