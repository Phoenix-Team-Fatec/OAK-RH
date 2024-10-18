import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedLayout/protectedRoutes";
import EquipeAdmin from "./pages/EquipesAdmin/equipeAdmin";
import RegisterLogin from "./pages/LoginRegister/RegisterLogin";
import MembersAdmin from "./pages/MembersAdmin/MembersAdmin";
import DashboardAdmin from "./pages/DashboardAdmin/DashboardAdmin"; 
import FormsAdmin from "./pages/FormsAdmin/FormsAdmin"; 
import SelecaoFormularioMembro from "./components/SelecaoFormularioMembro/selecaoFormularioMembro"; 
import FormsAdminCreate from "./pages/FormsAdminCreate/FormsAdminCreate";
import Responder from "./components/ResponderFormulário/responder";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterLogin />} />
        
        <Route 
          path="/dashboard-admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/equipes-admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <EquipeAdmin />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/funcionarios"
          element={
            <ProtectedRoute adminOnly={true}>
              <MembersAdmin />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/formularios-admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <FormsAdmin />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/lista-equipes"
          element={
              <SelecaoFormularioMembro />
          }
        />

      <Route
          path="/forms-admin-create"
          element={
            <ProtectedRoute adminOnly={true}>
              <FormsAdminCreate/>
            </ProtectedRoute>
          }
        />

      <Route path="/responder"
       element={
       <Responder/>
       } 
       />


      
      </Routes>



    </Router>
  );
};

export default App;
