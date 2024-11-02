import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RegisterLogin.css';
import { useNavigate } from 'react-router-dom';
import ToggleSwitch from '../../../components/ToggleSwitch/ToggleSwitch';
import AdmAuth from '../../../components/AuthInterfaces/AdmAuth';
import UserAuth from '../../../components/AuthInterfaces/UserAuth';

const RegisterLogin: React.FC = () => {
    const [isUserScreen, setIsUserScreen] = useState(false)
    const [isSignUpMode, setIsSignUpMode] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [emailLogin, setEmailLogin] = useState('');
    const [senhaLogin, setSenhaLogin] = useState('');
    const [isAdmin, setIsAdmin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const IdToken = sessionStorage.getItem('IdToken');
        const LastEntry = localStorage.getItem('isAdmin')
        if (IdToken) {
            sessionStorage.removeItem('IdToken');
        }
        if (LastEntry !== null) {
            if (LastEntry == "true") {
                setIsAdmin(LastEntry === 'true')
            } else {
                setIsAdmin(false)
                setIsUserScreen(true)
            }
        }
    }, []);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleMode = () => {
        setIsSignUpMode((prev) => !prev);
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading(true)

            const response = await axios.post('http://localhost:3000/adm', {
                nome,
                email,
                empresa,
                cnpj,
            });
            console.log("Successfully registered", response.data);

            alert("Empresa cadastrada com sucesso")

            // Limpar os campos de entrada após o registro
            setNome('');
            setEmail('');
            setEmpresa('');
            setCnpj('');

            toggleMode()
        } catch (error) {
            alert("Erro ao cadastrar empresa")
            console.log("Error in register", error);
        } finally {
            setIsLoading(false)
        }
    };

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (isAdmin) {
                try {
                    const response = await axios.post('http://localhost:3000/adm/login', {
                        email: emailLogin,
                        password: senhaLogin,
                    });

                    const user = response.data.user;
                    const { nome, email, empresa, cnpj, id_admin } = user;
                    const id: number = user.id;

                    const tokenToPayload = {
                        id,
                        nome,
                        email,
                        empresa,
                        cnpj,
                        id_admin
                    };

                    const tokenResponse = await axios.post("http://localhost:3000/generate-token", tokenToPayload);
                    const token = tokenResponse.data.token;

                    sessionStorage.setItem("IdToken", token);
                    localStorage.setItem("isAdmin", "true")

                    navigate('/funcionarios');

                    console.log("Successfully logged in as Admin", response.data);
                } catch (adminError) {
                    console.log("Admin login failed, attempting user login", adminError);
                    try {
                        const userResponse = await axios.post('http://localhost:3000/users/login', {
                            email: emailLogin,
                            password: senhaLogin,
                        });

                        alert("Você não tem acesso a esse portal");
                        setIsUserScreen(!isUserScreen);
                        setSenhaLogin('');
                        console.log("Logged in as User without access", userResponse.data);
                    } catch (userError) {
                        console.log("User login failed", userError);
                        alert("Invalid email or password. Try again");
                        setSenhaLogin('');
                    }
                }
            } else {
                try {
                    const response = await axios.post('http://localhost:3000/users/login', {
                        email: emailLogin,
                        password: senhaLogin,
                    });

                    const user = response.data.user;
                    const equipe = response.data.team;
                    const { nome, email, empresa, cnpj, id_admin } = user;
                    let equipe_id = 0
                    if (equipe != null) { equipe_id = equipe.equipe_id;; }
                    const id: number = user.id;

                    const tokenToPayload = {
                        id,
                        nome,
                        email,
                        empresa,
                        cnpj,
                        id_admin,
                        equipe_id
                    };

                    const tokenResponse = await axios.post("http://localhost:3000/generate-token", tokenToPayload);
                    const token = tokenResponse.data.token;

                    sessionStorage.setItem("IdToken", token);
                    localStorage.setItem("isAdmin", "false")

                    navigate('/dashboard-user');

                    console.log("Successfully logged in as User", response.data);
                } catch (userError) {
                    console.log("User login failed, attempting Admin login", userError);
                    try {
                        const adminResponse = await axios.post('http://localhost:3000/adm/login', {
                            email: emailLogin,
                            password: senhaLogin,
                        });

                        alert("Você não tem acesso a esse portal");
                        setIsUserScreen(!isUserScreen);
                        setIsAdmin(!isAdmin)
                        setSenhaLogin('');
                        console.log("Logged in as Admin without access", adminResponse.data);
                    } catch (adminError) {
                        console.log("Admin login failed", adminError);
                        alert("Invalid email or password. Try again");
                        setSenhaLogin('');
                    }
                }
            }
        } finally {
            setIsLoading(false);
        }
    };

    function handleChangeScreens() {
        setIsUserScreen(!isUserScreen)
        setIsAdmin(!isAdmin)
        setIsSignUpMode(false)
    }

    return (
        <div className='body_login_register'>
            <ToggleSwitch
                isOn={isUserScreen}
                handleToggle={handleChangeScreens}
            />
            <div className={`container ${isSignUpMode ? 'sign-up-mode' : ''}`}>
                {isUserScreen ? (
                    <UserAuth
                        handleSignIn={handleSignIn}
                        isLoading={isLoading}
                        showPassword={showPassword}
                        togglePasswordVisibility={togglePasswordVisibility}
                        emailLogin={emailLogin}
                        setEmailLogin={setEmailLogin}
                        senhaLogin={senhaLogin}
                        setSenhaLogin={setSenhaLogin}
                    />
                ) : (
                    <AdmAuth
                        isSignUpMode={isSignUpMode}
                        handleSignUp={handleSignUp}
                        handleSignIn={handleSignIn}
                        toggleMode={toggleMode}
                        isLoading={isLoading}
                        showPassword={showPassword}
                        togglePasswordVisibility={togglePasswordVisibility}
                        nome={nome}
                        setNome={setNome}
                        email={email}
                        setEmail={setEmail}
                        empresa={empresa}
                        setEmpresa={setEmpresa}
                        cnpj={cnpj}
                        setCnpj={setCnpj}
                        emailLogin={emailLogin}
                        setEmailLogin={setEmailLogin}
                        senhaLogin={senhaLogin}
                        setSenhaLogin={setSenhaLogin}
                    />
                )}
            </div>
        </div>
    );
};

export default RegisterLogin;
