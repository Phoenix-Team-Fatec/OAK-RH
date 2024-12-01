import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Card, Typography, List, ListItem, ListItemText } from '@mui/material';
import { Chip } from '@mui/material';
import { getResumes, getNameQuestion } from '.';
import './AdminFormsResume.css';


const COLORS = ['#8C6A8B', '#8297d0', '#37cbfb', '#1afcf5'];

const FormsAdminResume: React.FC = () => {
  const [perguntas, setPerguntas] = useState<
    { pergunta_id: number; texto: string; respostas: { name: string; value: number }[] }[]
  >([]);

  const [formId] = useState(() => {
    const params = new URLSearchParams(document.location.search);
    const id = params.get("form");
 
    return id !== null ? id : 0;
  })

  const [equipe_id] = useState(() => {
    const params = new URLSearchParams(document.location.search);
    const id = params.get("equipe");
  
    return id !== null ? id : 0;
  });

  const [showPercentages, setShowPercentages] = useState(false);

  
  const fetchData = async () => {
    try {
      
      // Passo 1: Obter dados agrupados diretamente
      const resumes = await getResumes(Number(formId) - 7, Number(equipe_id));

      // Passo 2: Para cada pergunta, buscar o texto e preparar as respostas
    const perguntasComTexto = await Promise.all(
      resumes.map(async (group: any) => {
        const perguntaTexto = await getNameQuestion(group.pergunta_id);

        // Contar as respostas
        const contagemRespostas = group.respostas.reduce((acc: any, respostaObj: any) => {
          const resposta = typeof respostaObj.resposta === 'string'
            ? respostaObj.resposta // Resposta direta
            : Array.isArray(respostaObj.resposta)
            ? respostaObj.resposta.join(', ') // Formatar array como string
            : JSON.stringify(respostaObj.resposta); // Outros objetos, converter para string

          acc[resposta] = (acc[resposta] || 0) + 1;
          return acc;
        }, {});

        // Formatar para o gráfico
        const respostasFormatadas = Object.entries(contagemRespostas).map(([name, value]) => ({
          name,
          value: Number(value),
        }));

        

        return {
          pergunta_id: group.pergunta_id,
          texto: perguntaTexto.texto, // A propriedade "texto" deve vir do backend
          respostas: respostasFormatadas,
        };
      })
    );

    setPerguntas(perguntasComTexto);
  } catch (error) {
    console.log('Error fetching data', error);
    alert('Erro ao buscar dados');
  }
  };

  useEffect(() => {
    fetchData();
  }, [formId, equipe_id]);

  return (
    <Card className="main-card">
      <div className="div-botao-pdf">
        <Typography variant="h5" className="main-title">
          Resumo das Respostas
        </Typography>
        <Chip
          label="Baixar PDF"
          variant="outlined"
          style={{ borderColor: 'red', color: 'red' }}
        />
      </div>
      <div className="chart-container">
        {perguntas.map((pergunta, index) => (
          <div className="chart-section" key={pergunta.pergunta_id}>
            <Typography variant="subtitle1" className="question-title">
              {index + 1} - {pergunta.texto}
            </Typography>
            <div className="chart-content">
              <PieChart width={250} height={250}>
                <Pie
                  data={pergunta.respostas}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pergunta.respostas.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
              <List className="option-list">
                {pergunta.respostas.map((item, idx) => (
                  <ListItem key={idx}>
                    <ListItemText
                      primary={`${item.name}: ${item.value}`}
                      style={{ color: COLORS[idx % COLORS.length] }}
                    />
                  </ListItem>
                ))}
              </List>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default FormsAdminResume;
