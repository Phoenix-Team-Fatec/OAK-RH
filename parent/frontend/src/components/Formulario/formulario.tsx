import React, { useState, useEffect } from 'react';
import './Formulario.css';
import DeleteIcon from '@mui/icons-material/Delete';
import { createForm, createQuestion, listCategories } from './formulario'; // Suas funções API
import SalvarFormularioModal from '../SalvarFormularioModal/SalvarFormularioModal'; // Caminho do modal
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate
import useUserData from '../../hooks/useUserData';

// Interfaces
interface Category {
  id: number;
  nome: string;
}

interface Question {
  type: string;
  value: string;
  options: string[];
  category: string;
}

interface Form {
  title: string;
  description: string;
  adminId: number;
}

const userData = useUserData()

const Formulario: React.FC = () => {
  const [form, setForm] = useState<Form>({
    title: 'Título do Formulário',
    description: 'Descrição do Formulário',
    adminId: userData.id
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [questions, setQuestions] = useState<Question[]>([
    { type: 'longQuestion', value: '', options: [], category: '' }
  ]);

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isError, setIsError] = useState(false); // Estado para verificar se é um erro ou sucesso
  const navigate = useNavigate(); // Hook for navigation

  // Fetch categories and update default question category
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const categorias = await listCategories(form.adminId);
        setCategories(categorias);
        console.log('Categorias retornadas:', categorias);
      } catch (error) {
        console.log("Erro ao buscar categorias:", error);
      }
    };
    fetchCategorias();
  }, [form.adminId]);

  useEffect(() => {
    if (categories.length > 0) {
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) => ({
          ...q,
          category: q.category || categories[0].nome, // Set default category if not selected
        }))
      );
    }
  }, [categories]);

  // Add a new question
  const addQuestion = () => {
    setQuestions([
      ...questions,
      { type: 'longQuestion', value: '', options: [], category: categories[0].nome }
    ]);
  };

  // Remove a question
  const deleteQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  // Change question value
  const handleQuestionChange = (index: number, newValue: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].value = newValue;
    setQuestions(updatedQuestions);
  };

  // Change question type
  const handleQuestionTypeChange = (index: number, newType: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].type = newType;
    updatedQuestions[index].options = newType === 'multipleChoice' ? [''] : [];
    setQuestions(updatedQuestions);
  };

  // Change question category
  const handleQuestionCategoryChange = (index: number, newCategory: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].category = newCategory;
    setQuestions(updatedQuestions);
  };

  // Add an option to a multiple/unique choice question
  const handleAddOption = (index: number) => {
    const updatedQuestions = [...questions];
    if (updatedQuestions[index].options.length < 10) {
      updatedQuestions[index].options.push('');
      setQuestions(updatedQuestions);
    } else {
      alert('Limite de 10 opções atingido');
    }
  };

  // Change the value of an option
  const handleOptionChange = (qIndex: number, optIndex: number, newValue: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[optIndex] = newValue;
    setQuestions(updatedQuestions); 
  };

  // Delete an option
  const deleteOption = (qIndex: number, optIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options = updatedQuestions[qIndex].options.filter(
      (_, i) => i !== optIndex
    );
    setQuestions(updatedQuestions);
  };

  // Função para fechar o modal de erro
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Submit the form and create the questions
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const questionCount = questions.length;

    // Validação: 0 ou mais de 20 perguntas, não permite envio
    if (questionCount === 0 || questionCount > 20) {
      setModalMessage('O formulário deve conter de 1 a 20 perguntas.');
      setIsError(true); // Sinaliza que é um erro
      setModalOpen(true);
      return;
    }

    // Validação do título e descrição
    if (!form.title || !form.description) {
      setModalMessage('O título e a descrição do formulário são obrigatórios');
      setIsError(true); // Sinaliza que é um erro
      setModalOpen(true);
      return;
    }

    // Verifica se todas as perguntas estão preenchidas
    for (const question of questions) {
      if (!question.value) {
        setModalMessage('Preencha todas as perguntas antes de enviar.');
        setIsError(true); // Sinaliza que é um erro
        setModalOpen(true);
        return;
      }
    }

    try {
      // Cria o formulário
      const formResponse = await createForm(form.title, form.description, form.adminId);
      const formulario_id = formResponse.id;

      // Cria as perguntas associadas ao formulário
      for (const question of questions) {
        const category = categories.find(c => c.nome === question.category);
        if (!category) {
          setModalMessage(`Categoria não encontrada para a pergunta: ${question.value}`);
          setIsError(true); // Sinaliza que é um erro
          setModalOpen(true);
          return;
        }

        await createQuestion(
          formulario_id,
          question.value,
          question.type,
          question.options,
          category.id
        );
      }

      setModalMessage('Formulário e perguntas criados com sucesso!');
      setIsError(false); // Sinaliza que é sucesso
      setModalOpen(true);
    } catch (error) {
      setModalMessage('Erro ao criar o formulário ou perguntas.');
      setIsError(true); // Sinaliza que é um erro
      setModalOpen(true);
    }
  };

  // Função para tratar o clique no OK do modal
  const handleModalOkClick = () => {
    setModalOpen(false);
    if (!isError) {
      navigate('/formularios-admin'); // Apenas redireciona se for sucesso
    }
  };

  return (
    <div className="form-container-forms-create">
      <h2>Criar Formulário</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Título do Formulário</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Edite o título do formulário"
          />
        </div>

        <div className="form-group">
          <label>Descrição do Formulário</label>
          <input
            type="text"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Edite a descrição do formulário"
          />
        </div>

        {questions.map((question, qIndex) => (
          <div className="question-container" key={qIndex}>
            <div className="question-content">
              <DeleteIcon className="delete-icon" onClick={() => deleteQuestion(qIndex)} />

              <div className="form-group">
                <label>Categoria da Pergunta</label>
                <select
                  value={question.category}
                  onChange={(e) => handleQuestionCategoryChange(qIndex, e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.nome}>
                      {category.nome}
                    </option>
                  ))}
                </select>
              </div>

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
              </div>

              <div className="form-group">
                <label>Pergunta {qIndex + 1}</label>
                <input
                  type="text"
                  value={question.value}
                  onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                  placeholder="Escreva sua pergunta aqui"
                />
              </div>

              {(question.type === 'multipleChoice' || question.type ==='uniqueChoice') && (
                <div className="options">
                  <label>Opções</label>
                  {question.options.map((option, optIndex) => (
                    <div className="option" key={optIndex}>
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(qIndex, optIndex, e.target.value)}
                      />
                      <DeleteIcon className="delete-icon delete-option" onClick={() => deleteOption(qIndex, optIndex)} />
                    </div>
                  ))}
                  <button type="button" className="button-forms-create" onClick={() => handleAddOption(qIndex)}>
                    Adicionar Opção
                  </button>
                </div>
              )}


            
            </div>
          </div>
        ))}



        



        

        <button type="button" className="button-forms-create" onClick={addQuestion}>
          Adicionar Pergunta
        </button>
        <button type="submit" className="button-forms-create">Salvar Formulário</button>
      </form>

      <SalvarFormularioModal
        open={modalOpen}
        onClose={handleCloseModal}
        message={modalMessage}
        isError={isError}
        onOk={handleModalOkClick} // Correção aqui
      />
    </div>
  );
};

export default Formulario;
