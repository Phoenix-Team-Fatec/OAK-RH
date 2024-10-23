import React from 'react';
import './DashboardAdmin.css';
import SidebarAdmin from '../../../components/SidebarAdmin/SidebarAdmin';

const DashboardAdmin: React.FC = () => {
  return (
    <>
    <SidebarAdmin />
    <div className="dashboard-admin-container">
      <h1 className="dashboard-admin-title">Bem-vindo ao Dashboard!</h1>
      <p className="dashboard-admin-description">Aqui você pode visualizar informações gerais da sua conta.</p>

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
    </>
  );
};

export default DashboardAdmin;
