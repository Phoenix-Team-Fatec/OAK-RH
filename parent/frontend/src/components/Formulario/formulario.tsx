import React, { useState } from 'react';
import './Formulario.css';
import DeleteIcon from '@mui/icons-material/Delete'; // Importando ícone de deletar

const Formulario: React.FC = () => {
  const [formTitle, setFormTitle] = useState('Título do Formulário');
  const [questions, setQuestions] = useState([
    { type: 'longQuestion', value: '', options: [], category: 'Autoavaliação' }
  ]);
  const [category, setCategory] = useState('Autoavaliação');
  const [teams, setTeams] = useState('');
  const [leader, setLeader] = useState('');

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { type: 'longQuestion', value: '', options: [], category: 'Autoavaliação' }
    ]);
  };

  const deleteQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const deleteOption = (qIndex: number, optIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options = updatedQuestions[qIndex].options.filter(
      (_, i) => i !== optIndex
    );
    setQuestions(updatedQuestions);
  };

  const handleQuestionChange = (index: number, newValue: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].value = newValue;
    setQuestions(updatedQuestions);
  };

  const handleQuestionTypeChange = (index: number, newType: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].type = newType;
    updatedQuestions[index].options = newType === 'multipleChoice' ? [''] : [];
    setQuestions(updatedQuestions);
  };

  const handleAddOption = (index: number) => {
    const updatedQuestions = [...questions];
    if (updatedQuestions[index].options.length < 10) {
      updatedQuestions[index].options.push('');
      setQuestions(updatedQuestions);
    } else {
      alert('Limite de 10 opções atingido');
    }
  };

  const handleOptionChange = (qIndex: number, optIndex: number, newValue: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[optIndex] = newValue;
    setQuestions(updatedQuestions);
  };

  const handleQuestionCategoryChange = (index: number, newCategory: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].category = newCategory;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted', { formTitle, category, teams, leader, questions });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
          placeholder="Edite o título do formulário"
          className="form-title-input"
        />

        {questions.map((question, qIndex) => (
          <div className="question-container" key={qIndex}>
            <div className="question-content">
            <DeleteIcon
                className="delete-icon"
                onClick={() => deleteQuestion(qIndex)}
              />
              <div className="form-group">
                <label>Tipo de Pergunta</label>

                <select
                  value={question.type}
                  onChange={(e) => handleQuestionTypeChange(qIndex, e.target.value)}
                >
                  <option value="longQuestion">Pergunta Longa</option>
                  <option value="multipleChoice">Múltipla Escolha</option>
                  <option value="uniqueChoice">Escolha Única</option>
                </select>

                <label>Pergunta {qIndex + 1}</label>
                <input
                  type="text"
                  placeholder="Escreva sua pergunta"
                  value={question.value}
                  onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                />

                <label>Categoria da Pergunta</label>
                <select
                  value={question.category}
                  onChange={(e) => handleQuestionCategoryChange(qIndex, e.target.value)}
                >
                  <option value="Autoavaliação">Autoavaliação</option>
                  <option value="Avaliação de Liderança">Avaliação de Liderança</option>
                  <option value="Avaliação de Liderado">Avaliação de Liderado</option>
                </select>

                {question.type === 'multipleChoice' && (
                  <div className="options">
                    {question.options.map((option, optIndex) => (
                      <div key={optIndex} className="option-item">
                        <input
                          type="text"
                          placeholder={`Opção ${optIndex + 1}`}
                          value={option}
                          onChange={(e) =>
                            handleOptionChange(qIndex, optIndex, e.target.value)
                          }
                        />
                        
                        <DeleteIcon
                          className="delete-icon"
                          onClick={() => deleteOption(qIndex, optIndex)}
                        />
                      </div>
                    ))}
                    {question.options.length < 10 && (
                      <button type="button" onClick={() => handleAddOption(qIndex)}>
                        Adicionar Opção
                      </button>
                    )}
                  </div>
                )}
              </div>

            </div>
          </div>
        ))}

        <button type="button" onClick={addQuestion}>
          Adicionar Pergunta
        </button>

        <div className="dropdown-container">
          <div className="form-group">
            <label>Equipes</label>
            <select value={teams} onChange={(e) => setTeams(e.target.value)}>
              <option value="todas">Todas</option>
              <option value="equipe1">Equipe 1</option>
            </select>
          </div>

          <div className="form-group">
            <label>Líder ou Liderados</label>
            <select value={leader} onChange={(e) => setLeader(e.target.value)}>
              <option value="lider">Líder</option>
              <option value="liderado">Liderados</option>
              <option value="ambos">Ambos</option>
            </select>
          </div>
        </div>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Formulario;
