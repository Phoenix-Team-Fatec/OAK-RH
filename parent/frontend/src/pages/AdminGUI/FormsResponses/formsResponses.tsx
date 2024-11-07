import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Button, ButtonGroup } from '@mui/material';
import './FormsResponses.css';
import FormsAdminResume from '../../../components/AdminFormsResume/AdminFormsResume';
// Importe os outros componentes que serão exibidos ao clicar nos botões
//import FormsAdminQuestions from '../../../components/AdminFormsQuestions/AdminFormsQuestions';
//import FormsAdminIndividual from '../../../components/AdminFormsIndividual/AdminFormsIndividual';

const FormsResponses: React.FC = () => {
  // Estado para controlar o componente atual
  const [activeComponent, setActiveComponent] = useState('Resumo');

  // Função para renderizar o componente baseado no estado atual
  const renderComponent = () => {
    switch (activeComponent) {
      case 'Resumo':
        return <FormsAdminResume />;
      case 'Perguntas':
        return <FormsAdminQuestions />; // Substituir pelo componente de perguntas
      case 'Individual':
        return <FormsAdminIndividual />; // Substituir pelo componente de respostas individuais das respostas de texto
      default:
        return <FormsAdminResume />;
    }
  };

  return (
    <Box className="forms-container">
      
      {/* Card Superior */}
      <Card className="card-upper">
      <Button className="button-voltar" onClick={() => window.location.href = '/dashboard'}>Voltar</Button>
        <CardContent>
          <Typography className="questions-text" variant="h6" align="center">
            18 respostas  {/* Puxar do back-end a quantidade -- Colocar botao de voltar?*/}
          </Typography>

          <ButtonGroup className="button-responses" variant="contained" fullWidth>
            <Button onClick={() => setActiveComponent('Resumo')}>Resumo</Button>
            <Button onClick={() => setActiveComponent('Perguntas')}>Perguntas</Button>
            <Button onClick={() => setActiveComponent('Individual')}>Individual</Button>
          </ButtonGroup>
        </CardContent>
      </Card>

      {/* Card Inferior - Renderiza o componente baseado no estado */}
      <Box className="card-lower">
        {renderComponent()}
      </Box>
    </Box>
  );
};

export default FormsResponses;
