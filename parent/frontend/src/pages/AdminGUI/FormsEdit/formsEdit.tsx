import SidebarAdmin from "../../../components/ComponentsAdmin/SidebarAdmin/SidebarAdmin";
import useUserData from "../../../hooks/useUserData";
import { getForm, getQuestions, getCategories } from ".";
import React, { useEffect, useState } from "react";
import RenderDraftForm from "./renderDraftForm";

interface Question{
    id:number;
    type: string;
    value: string;
    options: string[];
    category: string;
}


const FormsEdit: React.FC = () => {

    const {id} = useUserData();
    
    const [formulario_id] = useState( () =>{
        const params = new URLSearchParams(document.location.search)
        const id = params.get("formulario_id")
        return id !== null ? id : 0
    });

    const [isExpanded, setIsExpanded] = useState(true);
    const[formTitle, setFormTitle] = useState("");
    const[formDescription, setFormDescription] = useState("");
    const [categories, setCategories] = useState([]);
    const [questions, setQuestions] = useState<Question[]>([]);

    const getFormInfo = async () => {
       try{
        const form = await getForm(Number(formulario_id));
        if (form === null){
            alert(`Formulário não encontrado`)
        }
            setFormTitle(form?.titulo);
            setFormDescription(form?.descricao);   
        

       }catch(error){
          alert(`Erro ao renderizar formulário`)
          console.log(error)
       }
       

    }

    const getQuestionsInfo = async () => {
        try{
            const questions = await getQuestions(Number(formulario_id));
            console.log(questions)
            setQuestions(questions);

        }catch(error){
            alert(`Erro ao renderizar perguntas`)
            console.log(error)
        }
    }

    const getCategoriesInfo = async () => {
        try{
            const categoriesInfo = await getCategories(id);
            console.log(categoriesInfo)
            setCategories(categoriesInfo);
            

        }catch(error){
            alert(`Erro ao renderizar categorias`)
            console.log(error)
        }
    }


    useEffect(() => {
        getFormInfo();
        getQuestionsInfo();
        getCategoriesInfo();

    },[formulario_id]);


    const toggleSidebar = () => {
      setIsExpanded((prevState) => !prevState);
    };


 






    return (

        <>
           <SidebarAdmin isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
           <RenderDraftForm formId={Number(formulario_id)} formName={formTitle} formDescription={formDescription} questions={questions} categories={categories}/>
        </>

    )
}



export default FormsEdit;
