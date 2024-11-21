import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminFormsIndividual.css';
import { Chip } from '@mui/material';

interface FormResponse {
  userId: number;
  userName: string;
  formTitle: string;
  questions: {
    question: string;
    answers: string[];
  }[];
}

const AdminFormsIndividual: React.FC = () => {
  const [responses, setResponses] = useState<FormResponse[]>([]);
  const [currentResponseIndex, setCurrentResponseIndex] = useState(0);

  const mockData: FormResponse[] = [
    {
      userId: 1,
      userName: 'Usuário 1',
      formTitle: 'Formulário do Usuário 1',
      questions: [
        {
          question: 'Autonomia',
          answers: ['A) Bom', 'B) Médio', 'C) Ruim'],
        },
        {
          question: 'Autonomia (avaliação)',
          answers: ['1', '2', '3', '4'],
        },
        {
          question: 'Avalie Autonomia',
          answers: ['Minha autonomia é problemática'],
        },
      ],
    },
    {
      userId: 2,
      userName: 'Usuário 2',
      formTitle: 'Formulário do Usuário 2',
      questions: [
        {
          question: 'Comunicação',
          answers: ['A) Ótima', 'B) Boa', 'C) Ruim'],
        },
        {
          question: 'Comunicação (avaliação)',
          answers: ['5', '4', '3', '2'],
        },
        {
          question: 'Avalie Comunicação',
          answers: ['Minha comunicação precisa melhorar.'],
        },
      ],
    },
  ];

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        setResponses(mockData);
        // Substituir aqui  por uma chamada real:
        // const { data } = await axios.get('/api/form-responses');
        // setResponses(data);
      } catch (error) {
        console.error('Erro ao carregar os formulários:', error);
      }
    };

    fetchResponses();
  }, []);

  const handlePrevious = () => {
    if (currentResponseIndex > 0) {
      setCurrentResponseIndex(currentResponseIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentResponseIndex < responses.length - 1) {
      setCurrentResponseIndex(currentResponseIndex + 1);
    }
  };

  const currentResponse = responses[currentResponseIndex];

  return (
    <div className="admin-forms-container">
      {currentResponse ? (
        <div className="form-card">
          <div className='botao-pdf'>
          <Chip
            label="Baixar PDF"
            variant="outlined"
            style={{ borderColor: 'red', color: 'red' }} //Linkar para deixar clicavel com a criação do PDF
          />
          </div>
          <h2>{currentResponse.formTitle}</h2>
          <p><strong>Usuário:</strong> {currentResponse.userName}</p>
          <div className="form-questions">
            {currentResponse.questions.map((question, index) => (
              <div key={index} className="question-block">
                <h3>{question.question}</h3>
                <ul className="answers-list">
                  {question.answers.map((answer, idx) => (
                    <li key={idx}>{answer}</li>
                  ))}
                </ul>
                <hr className="question-separator" />
              </div>
            ))}
          </div>
          <div className="navigation-buttons">
            <button 
              onClick={handlePrevious} 
              disabled={currentResponseIndex === 0}
            >
              Anterior
            </button>
            <button 
              onClick={handleNext} 
              disabled={currentResponseIndex === responses.length - 1}
            >
              Próximo
            </button>
          </div>
        </div>
      ) : (
        <p>Carregando formulários...</p>
      )}
    </div>
  );
};

export default AdminFormsIndividual;