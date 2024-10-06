
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faUser, faLock, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import './RegisterLogin.css';

const RegisterLogin: React.FC = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleMode = () => {
    setIsSignUpMode((prev) => !prev);
  };

  return (
    <div className={`container ${isSignUpMode ? 'sign-up-mode' : ''}`}>

      <div className="form-container sign-in-container">
        <img src="/Security.png" alt="security" className={`security-img ${isSignUpMode ? 'slide-out' : 'slide-in'}`} />
      </div>

      <div className="form-container sign-up-container">

        <form className='register'>

                <h2>Cadastre sua Empresa</h2>

                        <div>
                            <input type="text" placeholder="Insira o nome do Administrador" required />
                        </div>

                        <div >
                            <input type="email" placeholder="Digite e-mail empresarial" required />
                        </div>

                        <div >
                            <input type="text" placeholder="Digite o nome da sua empresa" required />
                        </div>

                        <div>
                            <input type="text" placeholder="Digite o CNPJ" required />
                        </div>

                        <div >
                            <input type="password" placeholder="Crie uma senha" required />
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

          <form>

            <div className="input_group">

              <FontAwesomeIcon icon={faUser} />

              <input type="email" placeholder="Digite seu E-mail" required />

            </div>

            <div className="input_group">

              <FontAwesomeIcon icon={faLock} />

              <input type={showPassword ? "text" : "password"} 
              placeholder="Digite sua senha"/>

              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} 
              className="eye_icon" 
              onClick={togglePasswordVisibility}
              style={{ cursor: 'pointer' }}
              />

            </div>
            
            <button className="button_login" type="submit">Entrar</button>
            
            <button className="ghost" onClick={toggleMode}>Deseja cadastrar uma empresa?</button>

          </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RegisterLogin;
