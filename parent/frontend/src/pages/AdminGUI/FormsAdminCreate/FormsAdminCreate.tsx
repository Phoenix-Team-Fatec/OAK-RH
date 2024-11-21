import React, { useState } from "react";
import Formulario from "../../../components/Formulario/formulario.tsx";
import SidebarAdmin from "../../../components/ComponentsAdmin/SidebarAdmin/SidebarAdmin.tsx";
import "./FormsAdminCreate.css";
import NavbarMobileAdmin from "../../../components/ComponentsAdmin/NavbarMobileAdmin/NavbarMobileAdmin.tsx";

const FormsAdminCreate: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <div className="forms-admin-wrapper">
      <div className="Sidebar-Criar-Formulario">
      <SidebarAdmin isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
      </div>
      <div className="Navbar-Equipe-Admin">
      <NavbarMobileAdmin />
      </div>
      <div className={`formulario-container ${isExpanded ? "expanded" : "collapsed"}`}>
        <Formulario />
      </div>
    </div>
  );
};

export default FormsAdminCreate;
