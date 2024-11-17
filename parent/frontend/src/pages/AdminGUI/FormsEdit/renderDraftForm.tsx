import { useEffect, useState } from "react";
import '../../../components/Formulario/formulario.css'
import DeleteIcon from "@mui/icons-material/Delete";  
import { getCategories, editForm, editQuestion, getQuestions , deleteQuestion, createQuestion} from ".";
import useUserData from "../../../hooks/useUserData";
import { useNavigate } from "react-router-dom";
import ModalSendForm from "../../../components/modalSendFormsTeam/ModalSendFormsTeam";


interface RenderDraftFormProps {
    formId: number;
    formTitle: string;
    formDescription: string;
    
}

interface Category {
    id: number;
    nome: string;
}

interface Form {
    id:number
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


const RenderDraftForm: React.FC<RenderDraftFormProps> = ({ formId,  formTitle, formDescription }) => {

    const {id} = useUserData();
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [form, setForm] = useState<Form>({ id: formId ,title: '', description: '' });
    const [newQuestions, setNewQuestions] = useState<NewQuestion[]>([]);
    const [oldQuestions, setOldQuestions] = useState<Question[]>([]);
    const [categories, setCategoriesQuestion] = useState<Category[]>([]);



    useEffect(() => {

        const loadFormData = async () => {
        try{
            console.log(formId)
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
    
        

    },[]);

    useEffect(() => {
      setForm({ id: formId,title: formTitle, description: formDescription });
    }, [formTitle, formDescription]);


    //Função para atualizar perguntas existentes
    const handleQuestionChange = (qIndex:number, field: keyof Question, value: any) => {

        const updateQuestions = [...oldQuestions]
        updateQuestions[qIndex] = {...updateQuestions[qIndex], [field]: value};
        setOldQuestions(updateQuestions)

    }

 


    //Função para deletar uma pergunta
    const deleteQuestionHandler = async (questionId:number, qIndex:number) => {

       
        if (window.confirm(`Tem certeza que deseja deletar a pergunta?`)){
            await deleteQuestion(questionId)
        const updateQuestions = [...oldQuestions]
        updateQuestions.splice(qIndex, 1)
        setOldQuestions(updateQuestions)

        }
        

    }


    //Função para deletar uma nova pergunta
    const deleteNewQuestion = (qIndex:number) => {
        const updateQuestions = [...newQuestions]
        updateQuestions.splice(qIndex, 1)
        setNewQuestions(updateQuestions)
    }

    const handleNewQuestionTypeChange = (index: number, newType: string) => {
        const updatedQuestions = [...newQuestions];
        updatedQuestions[index].type = newType;
        updatedQuestions[index].options = newType === "multipleChoice" ? [""] : [];
        setNewQuestions(updatedQuestions);
      };

      const handleAddNewOption = (index: number) => {
        const updatedQuestions = [...newQuestions];
        if (updatedQuestions[index].options.length < 10) {
          updatedQuestions[index].options.push("");
          setNewQuestions(updatedQuestions);
        } else {
          alert("Limite de 10 opções atingido");
        }
      };

      const handleNewQuestionChange = (index: number, newValue: string) => {
        const updatedQuestions = [...newQuestions];
        updatedQuestions[index].value = newValue;
        setNewQuestions(updatedQuestions);
      };

      const handleOptionChange = (
      qIndex: number,
      optIndex: number,
      newValue: string
    ) => {
      const updatedQuestions = [...oldQuestions];
      updatedQuestions[qIndex].options[optIndex] = newValue;
      setOldQuestions(updatedQuestions);
    };

    const deleteOption = (qIndex: number, optIndex: number) => {
      const updatedQuestions = [...oldQuestions];
      updatedQuestions[qIndex].options = updatedQuestions[qIndex].options.filter(
        (_, i) => i !== optIndex
      );
      setOldQuestions(updatedQuestions);
    };

    const handleNewOptionChange = (
        qIndex: number,
        optIndex: number,
        newValue: string
      ) => {
        const updatedQuestions = [...newQuestions];
        updatedQuestions[qIndex].options[optIndex] = newValue;
        setNewQuestions(updatedQuestions);
      };
  
      const deleteOptionNew = (qIndex: number, optIndex: number) => {
        const updatedQuestions = [...newQuestions];
        updatedQuestions[qIndex].options = updatedQuestions[qIndex].options.filter(
          (_, i) => i !== optIndex
        );
        setNewQuestions(updatedQuestions);
      };

      const handleQuestionCategoryChange = (index: number, newCategory: string) => {
        const updatedQuestions = [...oldQuestions];
        updatedQuestions[index].category = newCategory;
        setOldQuestions(updatedQuestions);
      };

      const handleNewQuestionCategoryChange = (index: number, newCategory: string) => {
        const updatedQuestions = [...newQuestions];
        updatedQuestions[index].category = newCategory;
        setNewQuestions(updatedQuestions);
      };


  

    const addQuestion = () => {
        try{
            setNewQuestions([
                ...newQuestions,
                {
                  type: "longQuestion",
                  value: "",
                  options: [],
                  category: categories[0].nome,
                },
              ]);

        }catch(error){
            console.log(error)
        }
    
    };

    const updateForm =  async () => {
        try{
            const formUpdate = {nome: form.title, descricao: form.description}
            await editForm(formId, formUpdate);
            alert("Formulário atualizado com sucesso!")
        }catch(error){
            console.log(error)
            alert("Erro ao atualizar formulário")
        }
    }

    const saveQuestion = async () => {
        try {
            for (const question of newQuestions) {
                const category = categories.find((c) => c.nome === question.category);
                if (!category) {
                    throw new Error("Categoria inválida para nova pergunta.");
                }
                console.log("Criando pergunta com os dados:", {
                    formId: form.id,
                    value: question.value,
                    type: question.type,
                    options: question.options,
                    categoryId: category.id,
                });
                await createQuestion(
                    form.id,
                    question.value,
                    question.type,
                    question.options,
                    category.id
                );
            }
            console.log("Novas perguntas salvas com sucesso!");
        } catch (error) {
            console.log("Erro ao salvar novas perguntas:", error);
        }
    };


    const editOldQuestions = async () => {
        try {
            await Promise.all(
                oldQuestions.map((q) => {

                    return editQuestion(q.id, {
                        
                        texto: q.value,
                        tipo: q.type,
                        descricao: q.options,
                        categoria_id: categories.find((c) => c.nome === q.category)?.id,
                    });
                })
            );
            console.log("Perguntas antigas atualizadas com sucesso!");
        } catch (error) {
            console.log("Erro ao atualizar perguntas antigas:", error);
        }
    };
    




    const handleSaveDraft = async () => {
       
      
        try {
           
           
            
            await updateForm();
          
             if (newQuestions.length >= 1){
            
              
                await  saveQuestion();
             }
        
            
            await editOldQuestions();
            
           
            
           
            
           
        } catch (error) {
            console.error(error);
            alert("Erro ao salvar o rascunho. Por favor, tente novamente.");
        }finally{
            
           
            sessionStorage.removeItem("formulario_id");
            
        }
      
    }

    const handleCloseModal = () => {
        setModalOpen(false);
        handleSaveDraft();
          navigate("/formularios-admin");
        
      };

      const handleOpenModal = () => {
        setModalOpen(true);

      }
  
  



   
    return (
      <div className="formulario-wrapper">
      <div className="formulario-content">
          <h2 className="formulario-title">Editar Formulário</h2>
          <form className="forms-content-admin">
              <div className="formulario-field">
                  <input
                      type="text"
                      value={form.title || ""}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      placeholder="Título do Formulário"
                  />
              </div>

              <div className="formulario-field">
                  <input
                      type="text"
                      value={form.description || ""}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      placeholder="Descrição do Formulário"
                  />
              </div>

              {...oldQuestions.map((question, qIndex) => (
               
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
                                              handleOptionChange(qIndex, optIndex, e.target.value);
                                          }}
                                      />
                                      <DeleteIcon
                                      className="delete-icon"
                                      onClick={() => deleteOption(qIndex, optIndex)}
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
              {...newQuestions.map( (question, qIndex) => (

                            <div className="question-wrapper" key={qIndex}>
                            <DeleteIcon
                            className="delete-icon"
                            onClick={() => deleteNewQuestion(qIndex)}
                            />
                            <div className="formulario-field">
                            <label>Categoria da Pergunta</label>
                            <select
                                value={question.category}
                                onChange={(e) => handleNewQuestionCategoryChange(qIndex, e.target.value)}   
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
                                onChange = {(e) => handleNewQuestionTypeChange(qIndex, e.target.value)}
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
                                onChange={(e) => handleNewQuestionChange(qIndex, e.target.value)}
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
                                    onChange={(e) => {
                                        handleNewOptionChange(qIndex, optIndex, e.target.value);
                                    }}
                                    />
                                    <DeleteIcon
                                    className="delete-icon delete-option"
                                    onClick={() => deleteOptionNew(qIndex, optIndex)}
                                    />
                                </div>
                                ))}
                                <button
                                type="button"
                                className="add-option-button"
                                onClick={() => handleAddNewOption(qIndex)}
                            
                                >
                                + Adicionar Opção
                                </button>
                            </div>
                            )}
                            </div>



              ))}

              
           


              <button type="button" className="add-question-button" onClick={() => addQuestion()}>
                  Adicionar Pergunta
              </button>
              <br />
              <button type="submit" className="button-forms-create" onClick={() => {handleSaveDraft();  navigate("/formularios-admin");}}>
                  Salvar Rascunho
              </button>
              <button type="button" className="button-forms-create" onClick={() => handleOpenModal()}>
                  Enviar Formulário
              </button>
          </form>
      </div>

              
        <ModalSendForm
          open={modalOpen}
          onClose={handleCloseModal}
          formId={formId}
        />


  </div>
    );
};

export default RenderDraftForm;