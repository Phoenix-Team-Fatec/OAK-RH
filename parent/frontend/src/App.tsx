import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedLayout/protectedRoutes";
import EquipeAdmin from "./pages/AdminGUI/EquipesAdmin/equipeAdmin";
import RegisterLogin from "./pages/AdminGUI/LoginRegister/RegisterLogin";
import MembersAdmin from "./pages/AdminGUI/MembersAdmin/MembersAdmin";
import DashboardAdmin from "./pages/AdminGUI/DashboardAdmin/DashboardAdmin";
import FormsAdmin from "./pages/AdminGUI/FormsAdmin/FormsAdmin";
import SelecaoFormularioMembro from "./components/SelecaoFormularioMembro/selecaoFormularioMembro";
import FormsAdminCreate from "./pages/AdminGUI/FormsAdminCreate/FormsAdminCreate";
import Responder from "./components/ResponderFormulário/responder";
import DashboardUser from "./pages/User/DashboardUser/DashboardUser";
import UserFormsResponse from "./pages/UserGUI/UserFormsResponse/UserFormsResponse";
import UserFormsResponseView from "./pages/UserGUI/UserFormsViewResponse/UserFormsResponse";

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
          path="/forms-admin-create"
          element={
            <ProtectedRoute adminOnly={true}>
              <FormsAdminCreate />
            </ProtectedRoute>
          }
        />

        <Route path="/responder"
          element={
            <Responder />
          }
        />

        <Route path="/forms-user/responder" element={<UserFormsResponse />} />

        <Route path="/forms-user/ver" element={<UserFormsResponseView />} />


        <Route path="/dashboard-user"
          element={<DashboardUser />} />
      </Routes>

    </Router>
  );
};

export default App;
