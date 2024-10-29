import React, { useState, useEffect } from "react";
import "./Formulario.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { createForm, createQuestion, listCategories } from "./formulario"; // Suas funções API
import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate
import ModalSendForm from "../modalSendFormsTeam/ModalSendFormsTeam";
import useUserData from "../../hooks/useUserData";

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
  const { id } = useUserData();

  const [form, setForm] = useState<Form>({
    title: "Título do Formulário",
    description: "Descrição do Formulário",
    adminId: id,
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [questions, setQuestions] = useState<Question[]>([
    { type: "longQuestion", value: "", options: [], category: "" },
  ]);

  const [formId, setFormId] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  // Fetch categories and update default question category
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const categorias = await listCategories(form.adminId);
        setCategories(categorias);
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
          category: q.category || categories[0].nome,
        }))
      );
    }
  }, [categories]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        type: "longQuestion",
        value: "",
        options: [],
        category: categories[0].nome,
      },
    ]);
  };

  const deleteQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleQuestionChange = (index: number, newValue: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].value = newValue;
    setQuestions(updatedQuestions);
  };

  const handleQuestionTypeChange = (index: number, newType: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].type = newType;
    updatedQuestions[index].options = newType === "multipleChoice" ? [""] : [];
    setQuestions(updatedQuestions);
  };

  const handleQuestionCategoryChange = (index: number, newCategory: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].category = newCategory;
    setQuestions(updatedQuestions);
  };

  const handleAddOption = (index: number) => {
    const updatedQuestions = [...questions];
    if (updatedQuestions[index].options.length < 10) {
      updatedQuestions[index].options.push("");
      setQuestions(updatedQuestions);
    } else {
      alert("Limite de 10 opções atingido");
    }
  };

  const handleOptionChange = (
    qIndex: number,
    optIndex: number,
    newValue: string
  ) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[optIndex] = newValue;
    setQuestions(updatedQuestions);
  };

  const deleteOption = (qIndex: number, optIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options = updatedQuestions[qIndex].options.filter(
      (_, i) => i !== optIndex
    );
    setQuestions(updatedQuestions);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    if (!isError) {
      navigate("/formularios-admin");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (questions.length === 0 || questions.length > 20) {
      setModalMessage("O formulário deve conter de 1 a 20 perguntas.");
      setIsError(true);
      setModalOpen(true);
      return;
    }

    if (!form.title || !form.description) {
      setModalMessage("O título e a descrição do formulário são obrigatórios");
      setIsError(true);
      setModalOpen(true);
      return;
    }

    for (const question of questions) {
      if (!question.value) {
        setModalMessage("Preencha todas as perguntas antes de enviar.");
        setIsError(true);
        setModalOpen(true);
        return;
      }
    }

    try {
      const formResponse = await createForm(
        form.title,
        form.description,
        form.adminId
      );
      const formulario_id = formResponse.id;
      setFormId(formulario_id);

      for (const question of questions) {
        const category = categories.find((c) => c.nome === question.category);
        if (!category) {
          setModalMessage(
            `Categoria não encontrada para a pergunta: ${question.value}`
          );
          setIsError(true);
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

      setModalMessage("Formulário e perguntas criados com sucesso!");
      setIsError(false);
      setModalOpen(true);
    } catch (error) {
      setModalMessage("Erro ao criar o formulário ou perguntas.");
      setIsError(true);
      setModalOpen(true);
    }
  };

  return (
    <div className="formulario-wrapper">
      <div className="formulario-content">
        <h2 className="formulario-title">Criar Formulário</h2>
        <form onSubmit={handleSubmit} className="forms-content-admin">
          <div className="formulario-field">
            <label>Título do Formulário</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Edite o título do formulário"
            />
          </div>

          <div className="formulario-field">
            <label>Descrição do Formulário</label>
            <input
              type="text"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Edite a descrição do formulário"
            />
          </div>

          {questions.map((question, qIndex) => (
            <div className="question-wrapper" key={qIndex}>
              <DeleteIcon
                className="delete-icon"
                onClick={() => deleteQuestion(qIndex)}
              />
              <div className="formulario-field">
                <label>Categoria da Pergunta</label>
                <select
                  value={question.category}
                  onChange={(e) =>
                    handleQuestionCategoryChange(qIndex, e.target.value)
                  }
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.nome}>
                      {category.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div className="formulario-field">
                <label>Tipo de Pergunta</label>
                <select
                  value={question.type}
                  onChange={(e) =>
                    handleQuestionTypeChange(qIndex, e.target.value)
                  }
                >
                  <option value="longQuestion">Pergunta Longa</option>
                  <option value="multipleChoice">Múltipla Escolha</option>
                  <option value="uniqueChoice">Escolha Única</option>
                </select>
              </div>

              <div className="formulario-field">
                <label>Pergunta {qIndex + 1}</label>
                <input
                  type="text"
                  value={question.value}
                  onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                  placeholder="Escreva sua pergunta aqui"
                />
              </div>

              {(question.type === "multipleChoice" ||
                question.type === "uniqueChoice") && (
                <div className="options-wrapper">
                  <label>Opções</label>
                  {question.options.map((option, optIndex) => (
                    <div className="option-wrapper" key={optIndex}>
                      <input
                        type="text"
                        value={option}
                        className="option-input"
                        onChange={(e) =>
                          handleOptionChange(qIndex, optIndex, e.target.value)
                        }
                      />
                      <DeleteIcon
                        className="delete-icon delete-option"
                        onClick={() => deleteOption(qIndex, optIndex)}
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    className="add-option-button"
                    onClick={() => handleAddOption(qIndex)}
                  >
                    + Adicionar Opção
                  </button>
                </div>
              )}
            </div>
          ))}

          <button
            type="button"
            className="add-question-button"
            onClick={addQuestion}
          >
            Adicionar Pergunta
          </button>
          <button type="submit" className="submit-button">
            Criar Formulário
          </button>
        </form>
      </div>

      {modalOpen && (
        <ModalSendForm
          message={modalMessage}
          isError={isError}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Formulario;
