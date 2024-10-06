import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterLogin from './pages/RegisterLogin/RegisterLogin'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterLogin/>} />
      </Routes>
    </Router>
  );
};

export default App;