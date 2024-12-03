import React, { useState } from 'react';
import { Box, Card, CardContent, Button, ButtonGroup } from '@mui/material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
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

  const handleDownloadPDF = async () => {
    const element = document.querySelector('.card-lower') as HTMLElement;
    if (element) {
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 190; // Ajuste conforme necessário
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save('response.pdf');
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
            <br />
            <ButtonGroup className="button-responses" variant="contained" fullWidth>
              <Button onClick={() => setActiveComponent('Resumo')}>Resumo</Button>
              <Button onClick={handleDownloadPDF}>Baixar PDF</Button>
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
