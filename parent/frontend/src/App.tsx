import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/Login/login';
import DashboardAdmin from './components/DashboardAdmin/dashboardAdmin';
import ProtectedRoute from './components/ProtectedLayout/protectedRoutes';
import Logout from './components/Logout/logout';
import UserPage from './components/UserScreen/user';
import CadastroUser from './components/CadastroUser/CadastroUser';
import FormsAdmin from './components/FormsAdmin/formsAdmin';
import EquipeAdmin from './components/EquipesAdmin/equipeAdmin';
import Formulario from './components/Formulario/Formulario';
import SelecaoFormularioMembro from './components/SelecaoFormularioMembro/SelecaoFormularioMembro';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
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
            path='/equipesAdmin'
            element={
                <ProtectedRoute>
                  <EquipeAdmin />
                </ProtectedRoute>
            }
          />
      
        {/* Adicione a rota para logout */}
        <Route path="/logout" element={<Logout />} />



        <Route path="/user" element={<UserPage />} />



        <Route path="/cadastro" element={
           <ProtectedRoute adminOnly>
           <CadastroUser />
         </ProtectedRoute>
          
          } />

       <Route path="/formulario" element={
          <Formulario/>
       }/>

       <Route path="/selecaoFormularioMembro" element={       
            <SelecaoFormularioMembro/>
        }/>





      </Routes>
    </Router>
  );
};

export default App;