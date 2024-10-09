import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminMembers from './pages/AdminMembers/AdminMembers';
import Dashboard from './pages/AdminDashboard/AdminDashboard';
import Teams from './pages/AdminTeams/AdminTeams';
import Forms from './pages/AdminForms/AdminForms';
import Sidebar from './components/SidebarAdmin/Sidebar';

const App: React.FC = () => {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flexGrow: 1, padding: '20px', marginLeft: '12%' }}> {/* Adicionando um padding para espaçamento */}
          <Routes>
            <Route path="/" element={<Dashboard />} /> {/* Rota para Dashboard */}
            <Route path="/teams" element={<Teams />} /> {/* Rota para Equipes */}
            <Route path="/funcionarios" element={<AdminMembers />} /> {/* Rota para Funcionários */}
            <Route path="/forms" element={<Forms />} /> {/* Rota para Formulários */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
