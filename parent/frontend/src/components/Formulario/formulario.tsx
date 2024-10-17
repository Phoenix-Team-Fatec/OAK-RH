import React, { useState, useEffect } from 'react';
import './Formulario.css';
import DeleteIcon from '@mui/icons-material/Delete';
import { createForm, createQuestion, listCategories } from './formulario'; // Suas funções API

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

const Formulario: React.FC = () => {
  const [form, setForm] = useState<Form>({
    title: 'Título do Formulário',
    description: 'Descrição do Formulário',
    adminId: Number(localStorage.getItem("adminId"))

    
  });

  const [categories, setCategories] = useState<Category[]>([]);

  const [questions, setQuestions] = useState<Question[]>([
    { type: 'longQuestion', value: '', options: [], category: '' }
  ]);

 
// Quando as categorias forem carregadas, defina a primeira como padrão para as perguntas
useEffect(() => {
  if (categories.length > 0) {
    setQuestions((prevQuestions) => 
      prevQuestions.map((q) => ({
        ...q,
        category: q.category || categories[0].nome, // Atribui a primeira categoria, se ainda estiver vazia
      }))
    );
  }
}, [categories]);
  // Fetch de categorias do banco
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const categorias = await listCategories(form.adminId);
        console.log('Categorias retornadas:', categorias);
        setCategories(categorias);
      } catch (error) {
        console.log("Erro ao buscar categorias:", error);
      }
    };
    fetchCategorias();
  }, [form.adminId]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { type: 'longQuestion', value: '', options: [], category: categories[0].nome }
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

  // Função para criar o formulário e associar as perguntas
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.description) {
      alert('O título e a descrição do formulário são obrigatórios');
      return;
    }

    try {
      // 1. Criar o formulário
      const formResponse = await createForm(form.title, form.description, form.adminId);
      const formulario_id = formResponse.id; // Obtém o ID do formulário criado

      // 2. Criar as perguntas associadas ao formulário
      for (const question of questions) {
        if (!question.value) {
          alert('Preencha todas as perguntas antes de enviar.');
          return;
        }

        const category = categories.find(c => c.nome === question.category);
        console.log(question.category, category);
        if (!category) {
          alert(`Categoria não encontrada para a pergunta: ${question.value}`);
          return;
        }

        const questionResponse = await createQuestion(
          formulario_id,
          question.value,
          question.type,
          question.options, // Opções, se aplicável
          category.id // Obter ID da categoria
        );

        const data = questionResponse.data;
        console.log(data);

        
      }

      console.log('Formulário e perguntas criados com sucesso!');
    } catch (error) {
      console.log('Erro ao criar o formulário ou perguntas:', error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Edite o título do formulário"
          className="form-title-input"
        />

        <input
          type="text"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Edite a descrição do formulário"
          className="form-description-input"
        />

        {questions.map((question, qIndex) => (
          <div className="question-container" key={qIndex}>
            <div className="question-content">
              <DeleteIcon
                className="delete-icon"
                onClick={() => deleteQuestion(qIndex)}
              />
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

                {(question.type === 'multipleChoice' || question.type === 'uniqueChoice') && (
                  <div className="options">
                    {question.options.map((option, optIndex) => (
                      <div key={optIndex} className="option-item">
                        <input
                          type="text"
                          placeholder={`Opção ${optIndex + 1}`}
                          value={option}
                          onChange={(e) => handleOptionChange(qIndex, optIndex, e.target.value)}
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

        <button type="submit">Salvar Formulário</button>
      </form>
    </div>
  );
};

export default Formulario;
