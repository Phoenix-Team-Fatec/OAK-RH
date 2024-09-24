import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/Login/login';
import AdminPage from './components/Admin/admin';
import ProtectedRoute from './components/ProtectedLayout/protectedRoutes';
import Logout from './components/Logout/logout';
import UserPage from './components/UserScream/user';

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



      </Routes>
    </Router>
  );
};

export default App;