import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/Login/login';
import AdminPage from './components/Admin/admin';
import ProtectedRoute from './components/ProtectedLayout/protectedRoutes';
import Logout from './components/Logout/logout';
import UserPage from './components/UserScream/user';
import CadastroUser from './components/CadastroUser/CadastroUser';
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute adminOnly>
              <AdminPage />
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

       






      </Routes>
    </Router>
  );
};

export default App;