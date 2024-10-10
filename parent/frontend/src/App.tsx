import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedLayout/protectedRoutes";
import Logout from "./components/Logout/logout";

import EquipeAdmin from "./pages/EquipesAdmin/equipeAdmin";
import RegisterLogin from "./pages/LoginRegister/RegisterLogin";
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterLogin />} />
        <Route
          path="/dashboardAdmin"
          element={
            <ProtectedRoute adminOnly>
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/formsAdmin"
          element={
            <ProtectedRoute adminOnly>
              <FormsAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/equipesAdmin"
          element={
            <ProtectedRoute>
              <EquipeAdmin />
            </ProtectedRoute>
          }
        />

        {/* Adicione a rota para logout */}
        <Route path="/logout" element={<Logout />} />

        <Route path="/user" element={<UserPage />} />

        <Route
          path="/cadastro"
          element={
            <ProtectedRoute adminOnly>
              <CadastroUser />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
