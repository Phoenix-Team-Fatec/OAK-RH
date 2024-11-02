import React, { useState } from "react";
import "./DashboardAdmin.css";
import SidebarAdmin from "../../../components/ComponentsAdmin/SidebarAdmin/SidebarAdmin";

const DashboardAdmin: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <div className="dashboard-admin-wrapper">
      <SidebarAdmin isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
      <div className={`dashboard-admin-container ${isExpanded ? "expanded" : "collapsed"}`}>
        <h1 className="dashboard-admin-title">Bem-vindo ao Dashboard!</h1>
        <p className="dashboard-admin-description">
          Aqui você pode visualizar informações gerais da sua conta.
        </p>

        {/* Dashboard Cards */}
        <div className="dashboard-admin-cards">
          <div className="dashboard-admin-card">
            <h3 className="dashboard-admin-card-title">Total de Usuários</h3>
            <p className="dashboard-admin-card-value">350</p>
          </div>
          <div className="dashboard-admin-card">
            <h3 className="dashboard-admin-card-title">Equipes Ativas</h3>
            <p className="dashboard-admin-card-value">24</p>
          </div>
          <div className="dashboard-admin-card">
            <h3 className="dashboard-admin-card-title">Projetos Concluídos</h3>
            <p className="dashboard-admin-card-value">120</p>
          </div>
          <div className="dashboard-admin-card">
            <h3 className="dashboard-admin-card-title">Novos Feedbacks</h3>
            <p className="dashboard-admin-card-value">15</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
