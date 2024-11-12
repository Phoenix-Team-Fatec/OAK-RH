import SidebarAdmin from "../../../components/ComponentsAdmin/SidebarAdmin/SidebarAdmin";
import React, { useState } from "react";


const FormsEdit: React.FC = () => {

    const [isExpanded, setIsExpanded] = useState(true);


    const toggleSidebar = () => {
      setIsExpanded((prevState) => !prevState);
    };


    const [formulario_id] = useState( () =>{
        const params = new URLSearchParams(document.location.search)
        const id = params.get("formulario")
        return id !== null ? id : 0
    }



    )


    return (

        <>
           <SidebarAdmin isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
        </>

    )
}



export default FormsEdit;
