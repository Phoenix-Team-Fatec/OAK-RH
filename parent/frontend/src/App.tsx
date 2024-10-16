import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedLayout/protectedRoutes";
import EquipeAdmin from "./pages/EquipesAdmin/equipeAdmin";
import RegisterLogin from "./pages/LoginRegister/RegisterLogin";
import MembersAdmin from "./pages/MembersAdmin/MembersAdmin";
import DashboardAdmin from "./pages/DashboardAdmin/DashboardAdmin"; 
import FormsAdmin from "./pages/FormsAdmin/FormsAdmin"; 

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterLogin />} />
        
        <Route 
          path="/dashboard-admin"
          element={
            <ProtectedRoute>
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/equipes-admin"
          element={
            <ProtectedRoute>
              <EquipeAdmin />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/funcionarios"
          element={
            <ProtectedRoute>
              <MembersAdmin />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/formularios-admin"
          element={
            <ProtectedRoute>
              <FormsAdmin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
