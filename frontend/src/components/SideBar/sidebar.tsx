import * as React from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import { styled } from '@mui/material/styles';

const drawerWidth = 240;

const CustomListem = styled(ListItem)(() => ({
  backgroundColor: '#556B2F', // Cor verde musgo
  borderRadius: '12px',
  gap: '12px', // Bordas redondas
  color: 'white', // Cor do texto branco
  marginBottom: '10px', // Margem entre os itens
  '&:hover': {
    backgroundColor: '#6B8E23', // Fundo verde mais claro no hover
  },
  '& .MuiListItemText-root': {
    color: 'white', // Cor branca para o texto
  },
  '& .MuiListItemIcon-root': {
    color: 'white', // Cor branca para o ícone
  },
}));

const Sidebar: React.FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List>
          {/* Botão Dashboard */}
          <CustomListem>
            <ListItem component="a" href="/dashboard" key="Dashboard">
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </CustomListem>

          {/* Botão Configurações */}
          <CustomListem>
            <ListItem component="a" href="/configuracoes" key="Configurações">
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Configurações" />
            </ListItem>
          </CustomListem>
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
