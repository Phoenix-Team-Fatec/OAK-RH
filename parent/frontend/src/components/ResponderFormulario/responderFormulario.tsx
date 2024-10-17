import React, { useState } from 'react';
import './responderFormulario.css';

const ResponderFormulario: React.FC = () => {
    const [formTitle, setFormTitle] = useState('Título do Formulário');
    const [questions, setQuestions] = useState([
        { type: 'longQuestion', value: '', options: [] }
    ]);
    const [category, setCategory] = useState('Autoavaliação');
    const [teams, setTeams] = useState('');
    const [leader, setLeader] = useState('');

    const addQuestion = () => {
        setQuestions([...questions, { type: 'longQuestion', value: '', options: [] }]);
    };

    const handleQuestionChange = (index: number, newValue: string) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].value = newValue;
        setQuestions(updatedQuestions);
    };

    const handleQuestionTypeChange = (index: number, newType: string) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].type = newType;
        updatedQuestions[index].value = '';
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

    const handleOptionChange = (questionIndex: number, optionIndex: number, newValue: string) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options[optionIndex] = newValue;
        setQuestions(updatedQuestions);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = {
            formTitle,
            category,
            teams,
            leader,
            questions,
        };
        console.log('Form submitted', formData);

        // Lógica para enviar formData ao backend
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

                {questions.map((question, index) => (
                    <div className="question-container" key={index}>
                        <div className="form-group">
                            <label htmlFor={`question-${index}`}>Tipo de pergunta</label>
                            <select
                                className="question-type-dropdown"
                                value={question.type}
                                onChange={(e) => handleQuestionTypeChange(index, e.target.value)}
                            >
                                <option value="longQuestion">Pergunta Longa</option>
                                <option value="multipleChoice">Múltipla Escolha</option>
                                <option value="uniqueChoice">Escolha Única</option>
                            </select>

                            <label htmlFor={`question-${index}`}>Pergunta {index + 1}</label>
                            <input
                                type="text"
                                id={`question-${index}`}
                                placeholder="Escreva sua pergunta"
                                value={question.value}
                                onChange={(e) => handleQuestionChange(index, e.target.value)}
                            />

                            {question.type === 'multipleChoice' && (
                                <div className="options">
                                    {question.options.map((option, optionIndex) => (
                                        <div key={optionIndex}>
                                            <input
                                                type="text"
                                                placeholder={`Opção ${optionIndex + 1}`}
                                                value={option}
                                                onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                                            />
                                        </div>
                                    ))}
                                    {question.options.length < 10 && (
                                        <button type="button" onClick={() => handleAddOption(index)}>
                                            Adicionar Opção
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                <button type="button" onClick={addQuestion}>
                    Adicionar Pergunta
                </button>

                <div className="dropdown-container">
                    <div className="form-group">
                        <label>Categoria da Pesquisa</label>
                        <select value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="Autoavaliação">Autoavaliação</option>
                            <option value="Avaliação de Liderança">Avaliação de Liderança</option>
                            <option value="Avaliação de Liderado">Avaliação de Liderado</option>
                        </select>
                    </div>

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

export default ResponderFormulario;