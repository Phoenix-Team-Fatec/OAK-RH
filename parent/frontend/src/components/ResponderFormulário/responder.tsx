import React from 'react';
import '/responder.css';

interface Question {
  type: string;
  value: string;
  options: string[];
  response?: string | string[]; // Pode armazenar múltiplas ou únicas respostas
}

interface FormData {
  formTitle: string;
  category: string;
  teams: string;
  leader: string;
  questions: Question[];
}

interface RespostasProps {
  formData: FormData;
}

const Responder: React.FC<RespostasProps> = ({ formData }) => {
  return (
    <div className="respostas-container">
      <h2>{formData.formTitle}</h2>
      <p><strong>Categoria:</strong> {formData.category}</p>
      <p><strong>Equipe:</strong> {formData.teams}</p>
      <p><strong>Líder/Liderados:</strong> {formData.leader}</p>

      <div className="questions-list">
        {formData.questions.map((question, index) => (
          <div className="question-response" key={index}>
            <h3>Pergunta {index + 1}</h3>
            <p>{question.value}</p>

            {question.type === 'longQuestion' && (
              <p><strong>Resposta:</strong> {question.response}</p>
            )}

            {question.type === 'multipleChoice' && (
              <div>
                <strong>Respostas:</strong>
                <ul>
                  {(question.response as string[]).map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
              </div>
            )}

            {question.type === 'uniqueChoice' && (
              <p><strong>Resposta:</strong> {question.response}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Responder;
