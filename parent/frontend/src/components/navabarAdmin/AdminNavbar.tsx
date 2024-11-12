import React, { useState, useEffect } from 'react';
import { Box, Typography, FormControl, Select, MenuItem, ListItemText, Button } from '@mui/material';
import useUserData from '../../hooks/useUserData';
import './AdminNavbar.css';
import { listAllTeams } from '../modalSendFormsTeam';
import { useNavigate } from 'react-router-dom';

const AdminNavbar: React.FC = () => {
  const [teams, setTeams] = useState<any[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  

  const { id } = useUserData();
  const navigate = useNavigate();

  const fetchTeams = async () => {
    try {
      const result = await listAllTeams(id);
      setTeams(result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDashChange = () => {
    try{
   
      navigate('/dashboard-admin');
    }catch(error){
      console.error(error);
    }

  } 

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleTeamChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedTeam(event.target.value as string);
   
    const teamId = teams.find((team) => team.nome === event.target.value)?.id;
    navigate(`/dashboard-admin-equipe?equipe=${teamId}`);
  };

  return (
    <Box className="admin-navbar">  
    <Button variant="contained" onClick={() => handleDashChange()}>Dashboard Geral</Button>
    
      <FormControl variant="outlined" className="team-select">
        <Select
          displayEmpty
          value={selectedTeam || ''}
          onChange={handleTeamChange}
          renderValue={(selected) => (selected ? selected : 'Selecione uma equipe')}
        >
          <MenuItem disabled value="">
            <em></em>
          </MenuItem>
          {teams.map((team) => (
            <MenuItem key={team.id} value={team.nome}>
              <ListItemText primary={team.nome} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default AdminNavbar;
