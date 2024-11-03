import React, { useState } from "react";
import Formulario from "../../../components/Formulario/formulario.tsx";
import SidebarAdmin from "../../../components/ComponentsAdmin/SidebarAdmin/SidebarAdmin.tsx";
import "./FormsAdminCreate.css";

const FormsAdminCreate: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <div className="forms-admin-wrapper">
      <SidebarAdmin isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
      <div className={`formulario-container ${isExpanded ? "expanded" : "collapsed"}`}>
        <Formulario />
      </div>
    </div>
  );
};

export default FormsAdminCreate;
