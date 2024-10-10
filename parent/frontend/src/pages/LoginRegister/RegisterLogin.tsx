import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faUser, faLock, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import axios from 'axios'
import './RegisterLogin.css';

const RegisterLogin: React.FC = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [emailLogin, setEmailLogin] = useState('');
  const [senhaLogin, setSenhaLogin] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleMode = () => {
    setIsSignUpMode((prev) => !prev);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/adm', {
        nome, 
        email,
        empresa,
        cnpj,
      });
      console.log("Succesffully register", response.data)
      setNome('');
      setEmail('');
      setEmpresa('');
      setCnpj('');
      
    }catch (error) {
      console.log("Error in register", error)
    }
  };
  
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/', {
        email: emailLogin,
        senha: senhaLogin
      });

      const { token, role } = response.data

      // Armazena o token no localStorage para autenticações futuras
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      console.log('Successfully logged in', response.data)

      // Redireciona para página conforme o papel do usuário
    }catch (error) {
      console.log("Error in login", error)
      alert("Invalid email or password. Try again");
    }
  }

  return (
    <div className={`container ${isSignUpMode ? 'sign-up-mode' : ''}`}>

      <div className="form-container sign-in-container">
        <img src="/Security.png" alt="security" className={`security-img ${isSignUpMode ? 'slide-out' : 'slide-in'}`} />
      </div>

      <div className="form-container sign-up-container">

        <form className='register' onSubmit={handleSignUp}>

                <h2>Cadastre sua Empresa</h2>

                        <div>
                            <input 
                            type="text" 
                            placeholder="Insira o nome do Administrador" 
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required />
                        </div>

                        <div >
                            <input 
                            type="email" 
                            placeholder="Digite e-mail empresarial" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required />
                        </div>

                        <div >
                            <input 
                            type="text" 
                            placeholder="Digite o nome da sua empresa" 
                            value={empresa}
                            onChange={(e) => setEmpresa(e.target.value)}
                            required />
                        </div>

                        <div>
                            <input 
                            type="text" 
                            placeholder="Digite o CNPJ" 
                            value={cnpj}
                            onChange={(e) => setCnpj(e.target.value)}
                            required />
                        </div>

                        <button className="register_button" type="submit">Cadastrar</button>
        </form>

        <img src='Security On-amico.png' alt="fundo" className={`fundo ${isSignUpMode ? 'fade-in' : 'fade-out'}`} />

      </div>

      <div className="overlay-container">

        <div className="overlay">

          <img className='logo_dois' src='logo.png'></img>
          <button className="ghost_dois" onClick={toggleMode}>voltar</button>

          <div className="overlay-panel overlay-left">

        </div>

        <div className="login_right">

          <img
           className="logo"
           src="/logo.png"
           alt="logo"
          />

          <h2>Login</h2>

          <form onSubmit={handleSignIn}>

            <div className="input_group">

              <FontAwesomeIcon icon={faUser} />

              <input 
              type="email"
              placeholder="Digite seu E-mail"
              value={emailLogin}
              onChange={(e) => setEmailLogin(e.target.value)}
              required />

            </div>

            <div className="input_group">

              <FontAwesomeIcon icon={faLock} />

              <input 
              type={showPassword ? "text" : "password"} 
              value={senhaLogin}
              onChange={(e) => setSenhaLogin(e.target.value)}
              placeholder="Digite sua senha"/>

              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} 
              className="eye_icon" 
              onClick={togglePasswordVisibility}
              style={{ cursor: 'pointer' }}
              />

            </div>
            
            <button className="button_login" type="submit">Entrar</button>
            
            <button className="ghost" onClick={toggleMode} type='button'>Deseja cadastrar uma empresa?</button>

          </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RegisterLogin;