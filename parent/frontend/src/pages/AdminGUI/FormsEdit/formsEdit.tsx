import SidebarAdmin from "../../../components/ComponentsAdmin/SidebarAdmin/SidebarAdmin";
import useUserData from "../../../hooks/useUserData";
import { getForm } from ".";
import React, { useEffect, useState } from "react";
import RenderDraftForm from "./renderDraftForm";




const FormsEdit: React.FC = () => {

   
    
    const [formulario_id] = useState( () =>{
        const params = new URLSearchParams(document.location.search)
        const id = params.get("formulario_id")
        return id !== null ? id : 0
    });

    const [isExpanded, setIsExpanded] = useState(true);
    const[formTitle, setFormTitle] = useState("");
    const[formDescription, setFormDescription] = useState("");
    

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




    useEffect(() => {
        getFormInfo();
        

    },[formulario_id]);


    const toggleSidebar = () => {
      setIsExpanded((prevState) => !prevState);
    };


 






    return (

        <>
           <SidebarAdmin isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
           <RenderDraftForm formId={Number(formulario_id)} formName={formTitle} formDescription={formDescription}/>
        </>

    )
}



export default FormsEdit;
