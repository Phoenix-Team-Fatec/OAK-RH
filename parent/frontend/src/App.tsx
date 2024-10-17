
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedLayout/protectedRoutes";
import EquipesAdmin from "./pages/EquipesAdmin/EquipesAdmin";
import RegisterLogin from "./pages/LoginRegister/RegisterLogin";
import MembersAdmin from "./pages/MembersAdmin/MembersAdmin";
import DashboardAdmin from "./pages/DashboardAdmin/DashboardAdmin"; 
import Formularios from "./pages/FormsAdmin/FormsAdmin";


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
              <EquipesAdmin />
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
              <Formularios />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
