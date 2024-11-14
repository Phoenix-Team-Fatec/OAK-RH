import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Card, Typography, List, ListItem, ListItemText } from '@mui/material';
import './AdminFormsResume.css';
import { Chip } from '@mui/material';

// Dados de exemplo para as perguntas, puxar do back-end
const singleChoiceData = [
  { name: 'Opção A', value: 40 },
  { name: 'Opção B', value: 30 },
  { name: 'Opção C', value: 20 },
  { name: 'Opção D', value: 10 },
];

const multipleChoiceData = [
  { name: 'Opção X', value: 50 },
  { name: 'Opção Y', value: 20 },
  { name: 'Opção Z', value: 30 },
];

const COLORS = ['#8C6A8B', '#8297d0', '#37cbfb', '#1afcf5'];

const FormsAdminResume: React.FC = () => {
  return (  
    <Card className="main-card">
      <div className='div-botao-pdf'>
      <Typography variant="h5" className="main-title">
        Resumo das Respostas de Escolha
      </Typography>
      <Chip
        label="Baixar PDF"
        variant="outlined"
        style={{ borderColor: 'red', color: 'red' }} //Linkar para deixar clicavel com a criação do PDF
      />
      </div>
      <div className="chart-container">
        {/* Gráfico de Pergunta de Escolha Única */}
        <div className="chart-section">
          <Typography variant="subtitle1" className="question-title">
            1 - Exemplo de pergunta de escolha única
          </Typography>
          <div className="chart-content">
            <PieChart width={250} height={250}>
              <Pie
                data={singleChoiceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"  //valor pro grafico pizza
              >
                {singleChoiceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
            <List className="option-list">
              {singleChoiceData.map((item, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={`${item.name}: ${item.value}%`} // Caso queira pode usar porcentagem ou não
                    style={{ color: COLORS[index % COLORS.length] }}
                  />
                </ListItem>
              ))}
            </List>
          </div>
        </div>

        {/* Gráfico de Pergunta de Múltipla Escolha */}
        <div className="chart-section">
          <Typography variant="subtitle1" className="question-title">
            2 - Exemplo de pergunta de múltipla escolha
          </Typography>
          <div className="chart-content">
            <PieChart width={250} height={250}>
              <Pie
                data={multipleChoiceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#82ca9d"
                dataKey="value"
              >
                {multipleChoiceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
            <List className="option-list">
              {multipleChoiceData.map((item, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={`${item.name}: ${item.value}%`}
                    style={{ color: COLORS[index % COLORS.length] }}
                  />
                </ListItem>
              ))}
            </List>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FormsAdminResume;
