import { useEffect, useState } from "react";
import '../../../components/Formulario/formulario.css'
import DeleteIcon from "@mui/icons-material/Delete";  
import { getCategories, editForm, editQuestion, getQuestions , deleteQuestion} from ".";
import useUserData from "../../../hooks/useUserData";


interface RenderDraftFormProps {
    formId: number;
    questions: Question[];
    formName: string;
    formDescription: string;
    categories: Category[];
}

interface Category {
    id: number;
    nome: string;
}

interface Form {
    title: string;
    description: string;
    
  }

interface Question {
    id:number;
    type: string;
    value: string;
    options: string[];
    category: string;
}


interface NewQuestion {
    type: string;
    value: string;
    options: string[];
    category: string;
}


const RenderDraftForm: React.FC<RenderDraftFormProps> = ({ formId, questions, formName, formDescription, categories }) => {

    const {id} = useUserData();
    const [form, setForm] = useState<Form>({ title: '', description: '' });
    const [newQuestions, setNewQuestions] = useState<NewQuestion[]>([]);
      const [oldQuestions, setOldQuestions] = useState<Question[]>(questions);
    const [categoriesQuestion, setCategoriesQuestion] = useState<Category[]>(categories);

    useEffect(() => {

        const loadFormData = async () => {
        try{
          const loadedQuestions = await getQuestions(formId);
          const loadedCategories = await getCategories(id)
          setOldQuestions(loadedQuestions);
          setCategoriesQuestion(loadedCategories);

        }catch(error){
          console.log(error)
        }
          
        };
        
        console.log(oldQuestions)
        

        loadFormData();
    
        

    },[formId]);

    useEffect(() => {
      setForm({ title: formName, description: formDescription });
    }, [formName, formDescription]);


    //Função para atualizar perguntas existentes
    const handleQuestionChange = (qIndex:number, field: keyof Question, value: any) => {

        const updateQuestions = [...oldQuestions]
        updateQuestions[qIndex] = {...updateQuestions[qIndex], [field]: value};
        setOldQuestions(updateQuestions)

    }

    //Função para salvar edição de uma pergunta
    const saveQuestion = async (questionId:number, questionData: Question) => {
      
      await editQuestion(questionId, questionData)
    
    }

    //Função para deletar uma pergunta
    const deleteQuestionHandler = async (questionId:number, qIndex:number) => {

        await deleteQuestion(questionId)
        const updateQuestions = [...oldQuestions]
        updateQuestions.splice(qIndex, 1)
        setOldQuestions(updateQuestions)

    }

    const addQuestion = () => {
      setNewQuestions([
        ...questions,
        {
          type: "longQuestion",
          value: "",
          options: [],
          category: categories[0].nome,
        },
      ]);
    };



   
    return (
      <div className="formulario-wrapper">
      <div className="formulario-content">
          <h2 className="formulario-title">Editar Formulário</h2>
          <form className="forms-content-admin">
              <div className="formulario-field">
                  <input
                      type="text"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      placeholder="Título do Formulário"
                  />
              </div>

              <div className="formulario-field">
                  <input
                      type="text"
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      placeholder="Descrição do Formulário"
                  />
              </div>

              {oldQuestions.map((question, qIndex) => (
               
                  <div className="question-wrapper" key={question.id}>
                     <DeleteIcon
                className="delete-icon"
                onClick={() => deleteQuestionHandler(question.id,qIndex)}
              />
                      <div className="formulario-field">
                          <label>Categoria da Pergunta</label>
                          <select
                              value={question.category}
                              onChange={(e) =>
                                  handleQuestionChange(qIndex, "category", e.target.value)
                              }
                          >
                              {categoriesQuestion.map((category) => (
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
                                  handleQuestionChange(qIndex, "type", e.target.value)
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
                              onChange={(e) =>
                                  handleQuestionChange(qIndex, "value", e.target.value)
                              }
                              placeholder="Escreva sua pergunta aqui"
                          />
                      </div>

                      {(question.type === "multipleChoice" || question.type === "uniqueChoice") && (
                          <div className="options-wrapper">
                              <label>Opções</label>
                              {question.options.map((option, optIndex) => (
                                  <div className="option-wrapper" key={optIndex}>
                                      <input
                                          type="text"
                                          value={option}
                                          onChange={(e) => {
                                              const updatedOptions = [...question.options];
                                              updatedOptions[optIndex] = e.target.value;
                                              handleQuestionChange(qIndex, "options", updatedOptions);
                                          }}
                                      />
                                      <DeleteIcon
                                      className="delete-icon"
                                      onClick={() => deleteQuestionHandler(question.id,qIndex)}
                                      />  
                                  </div>
                                  
                              ))}
                              <button
                                  type="button"
                                  className="add-option-button"
                                  onClick={() => {
                                      const updatedOptions = [...question.options, ""];
                                      handleQuestionChange(qIndex, "options", updatedOptions);
                                  }}
                              >
                                  + Adicionar Opção
                              </button>
                          </div>
                      )}
                      
                  </div>
              ))}

              <button type="button" className="add-question-button" >
                  Adicionar Pergunta
              </button>
              <button type="submit" className="button-forms-create">
                  Salvar Rascunho
              </button>
              <button type="button" className="button-forms-create">
                  Enviar Formulário
              </button>
          </form>
      </div>
  </div>
    );
};

export default RenderDraftForm;