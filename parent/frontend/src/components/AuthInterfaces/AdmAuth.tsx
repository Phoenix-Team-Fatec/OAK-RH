import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faUser, faLock, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

interface AdmAuthProps {
    isSignUpMode: boolean;
    handleSignUp: (e: React.FormEvent) => Promise<void>;
    handleSignIn: (e: React.FormEvent) => Promise<void>;
    toggleMode: () => void;
    isLoading: boolean;
    showPassword: boolean;
    togglePasswordVisibility: () => void;
    nome: string;
    setNome: React.Dispatch<React.SetStateAction<string>>;
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    empresa: string;
    setEmpresa: React.Dispatch<React.SetStateAction<string>>;
    cnpj: string;
    setCnpj: React.Dispatch<React.SetStateAction<string>>;
    emailLogin: string;
    setEmailLogin: React.Dispatch<React.SetStateAction<string>>;
    senhaLogin: string;
    setSenhaLogin: React.Dispatch<React.SetStateAction<string>>;
}

const AdmAuth: React.FC<AdmAuthProps> = ({
    isSignUpMode,
    handleSignUp,
    handleSignIn,
    toggleMode,
    isLoading,
    showPassword,
    togglePasswordVisibility,
    nome,
    setNome,
    email,
    setEmail,
    empresa,
    setEmpresa,
    cnpj,
    setCnpj,
    emailLogin,
    setEmailLogin,
    senhaLogin,
    setSenhaLogin,
}) => {
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
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            placeholder="Digite e-mail empresarial"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Digite o nome da sua empresa"
                            value={empresa}
                            onChange={(e) => setEmpresa(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Digite o CNPJ"
                            value={cnpj}
                            onChange={(e) => setCnpj(e.target.value)}
                            required
                        />
                    </div>
                    <button className="register_button" type="submit" disabled={isLoading}>
                        {isLoading ? <span className="spinner"></span> : 'Cadastrar'}
                    </button>
                </form>
                <img src='Security On-amico.png' alt="fundo" className={`fundo ${isSignUpMode ? 'fade-in' : 'fade-out'}`} />
            </div>

            <div className="overlay-container">
                <div className="overlay">
                    <img className='logo_dois' src='logo.png' alt="Logo" />
                    <button className="ghost_dois" onClick={toggleMode} disabled={isLoading}>
                        voltar
                    </button>
                    <div className="overlay-panel overlay-left"></div>

                    <div className="login_right">
                        <img className="logo" src="/logo.png" alt="logo" />
                        <h2>Login Admin</h2>
                        <form onSubmit={handleSignIn} className='form-input-group-admin'>
                            <div className="input_group">
                                <FontAwesomeIcon icon={faUser} />
                                <input
                                    type="email"
                                    placeholder="Digite seu E-mail"
                                    value={emailLogin}
                                    onChange={(e) => setEmailLogin(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="input_group">
                                <FontAwesomeIcon icon={faLock} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={senhaLogin}
                                    onChange={(e) => setSenhaLogin(e.target.value)}
                                    placeholder="Digite sua senha"
                                />
                                <FontAwesomeIcon
                                    icon={showPassword ? faEye : faEyeSlash}
                                    className="eye_icon"
                                    onClick={togglePasswordVisibility}
                                    style={{ cursor: 'pointer' }}
                                />
                            </div>

                            {isLoading ? (
                                <div className='loading_spinner'></div>
                            ) : (
                                <button className='button_login' type='submit'>Entrar</button>
                            )}

                            <button className="ghost" onClick={toggleMode} type='button'>Deseja cadastrar uma empresa?</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdmAuth;