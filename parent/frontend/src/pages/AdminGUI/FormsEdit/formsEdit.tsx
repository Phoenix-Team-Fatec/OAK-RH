import SidebarAdmin from "../../../components/ComponentsAdmin/SidebarAdmin/SidebarAdmin";

import { getForm } from ".";
import React, { useEffect, useState } from "react";
import RenderDraftForm from "./renderDraftForm";




const FormsEdit: React.FC = () => {

   
    
    const formulario_id = sessionStorage.getItem("formulario_id");

    const [isExpanded, setIsExpanded] = useState(true);
    const[formTitle, setFormTitle] = useState("");
    const[formDescription, setFormDescription] = useState("");
    

    const getFormInfo = async () => {
       try{
        console.log("Buscando formulário com id: ", formulario_id);
        const form = await getForm(Number(formulario_id));
        if (!form){
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

        console.log("Formulario_id: ", formulario_id);
        getFormInfo();
        

    },[]);


    const toggleSidebar = () => {   
      setIsExpanded((prevState) => !prevState);
    };


 






    return (

        <>
           <SidebarAdmin isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
           <RenderDraftForm formId={Number(formulario_id)} formTitle={formTitle} formDescription={formDescription}/>
        </>

    )
}



export default FormsEdit;
