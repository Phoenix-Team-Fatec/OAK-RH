import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faUser, faLock, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

interface UserAuthProps {
    handleSignIn: (e: React.FormEvent) => Promise<void>;
    isLoading: boolean;
    showPassword: boolean;
    togglePasswordVisibility: () => void;
    emailLogin: string;
    setEmailLogin: React.Dispatch<React.SetStateAction<string>>;
    senhaLogin: string;
    setSenhaLogin: React.Dispatch<React.SetStateAction<string>>;
}

const UserAuth: React.FC<UserAuthProps> = ({
    handleSignIn,
    isLoading,
    showPassword,
    togglePasswordVisibility,
    emailLogin,
    setEmailLogin,
    senhaLogin,
    setSenhaLogin,
}) => {
    return (
        <div className={`container`}>
            <div className="form-container sign-in-container">
                <img src="/Security.png" alt="security" className={`security-img`} />
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="login_right">
                        <img className="logo" src="/logo.png" alt="logo" />
                        <h2>Login User</h2>
                        <form onSubmit={handleSignIn} className='form-input-group-user'>
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

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserAuth;