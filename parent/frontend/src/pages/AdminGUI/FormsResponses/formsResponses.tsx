import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Button, ButtonGroup } from '@mui/material';
import './FormsResponses.css';
import FormsAdminResume from '../../../components/AdminFormsResume/AdminFormsResume';
import SidebarAdmin from '../../../components/ComponentsAdmin/SidebarAdmin/SidebarAdmin';
import NavbarMobileAdmin from '../../../components/ComponentsAdmin/NavbarMobileAdmin/NavbarMobileAdmin';
import AdminFormsIndividual from '../../../components/AdminFormsIndividual/AdminFormsIndividual';

const FormsResponses: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState('Resumo');
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Resumo':
        return <FormsAdminResume />;
      case 'Individual':
        return <AdminFormsIndividual />;
      case 'Baixar PDF':
        return <FormsAdminResume />;
      default:
        return <FormsAdminResume />;
    }
  };

  return (
    <div>
      <div>
      <SidebarAdmin isExpanded={isExpanded} toggleSidebar={toggleSidebar} />  
      </div>
      <div className="Navbar-Equipe-Admin">
      <NavbarMobileAdmin />
      </div>
      <Box className="forms-container">
        <Card className="card-upper">
          <CardContent>
            <Typography className="questions-text" variant="h6" align="center">
              18 respostas
            </Typography>

            <ButtonGroup className="button-responses" variant="contained" fullWidth>
              <Button onClick={() => setActiveComponent('Resumo')}>Resumo</Button>
              <Button onClick={() => setActiveComponent('Individual')}>Individual</Button>
            </ButtonGroup>
          </CardContent>
        </Card>
        <Box className="card-lower">
          {renderComponent()}
        </Box>
      </Box>
    </div>
  );
};

export default FormsResponses;
