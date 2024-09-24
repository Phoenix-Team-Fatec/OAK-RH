
import Sidebar from './components/SideBar/sidebar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import CadastroUser from './components/CadastroUser/CadastroUser';

function App() {
  return (
    <BrowserRouter>
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Sidebar />
      
      {/* Conteúdo principal da página */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Routes>
          <Route path="/cadastro" element={<CadastroUser />} />
        
        </Routes>
      </Box>
    </Box>
  </BrowserRouter>
  );
}
  
export default App;
