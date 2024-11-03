import React, { useState, useEffect } from "react";
import "./DashboardUser.css";
import SidebarUser from "../../../components/SidebarUser/SidebarUser";
import { listUser_Teams } from "../FormsUser/index";
import useUserData from "../../../hooks/useUserData";

interface Equipe {
    id: number;
    nome: string;
    isLider: boolean;
}

const DashboardUser: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [equipes, setEquipes] = useState<Equipe[]>([]);
    const [setError] = useState<string | null>(null);
    const { id } = useUserData();

    const toggleSidebar = () => {
        setIsExpanded((prevState) => !prevState);
    };

    useEffect(() => {
        const fetchUserTeams = async () => {
            try {
                const response = await listUser_Teams(id);
                const equipesData = response.flatMap((userItem: any) =>
                    userItem.user.map((userTeam: any) => ({
                        id: userTeam.equipes.id,
                        nome: userTeam.equipes.nome,
                        isLider: userTeam.is_lider,
                    }))
                );
                setEquipes(equipesData);
            } catch (error) {
                console.log(error);
                setError("Erro ao carregar equipes.");
            }
        };
        fetchUserTeams();
    }, [id]);

    return (
        <div className="dashboard-user-wrapper">
            <SidebarUser isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
            {/* Fake Navbar */}
            <div className={`navbar-user-dashboard ${isExpanded ? "expanded" : "collapsed"}`}>
                <span className="navbar-title-user-dashboard">
                    {isExpanded ? "Dashboard" : "Dashboard"}
                </span>
                <select className={`navbar-select-user-dashboard ${isExpanded ? "expanded" : "collapsed"}`}>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                </select>
            </div>


            <div className={`dashboard-user-container ${isExpanded ? "expanded" : "collapsed"}`}>
                {/* Dashboard Cards */}
                <div className="dashboard-user-cards">
                    <div className="upper-dashboard-user-card">
                        <div className="dashboard-card-header">
                            <h3 className="dashboard-user-card-title">Total de Usuários</h3>
                            <button className="dashboard-card-btn">Ver Todos</button>
                        </div>
                        <hr className="divider-line" />
                        <div className="dashboard-card-value-container">
                            <p className="dashboard-user-card-value">
                                Acompanhe sua <br /> autoavaliação mensal <br /> e veja sua evolução ao longo <br /> do tempo!
                            </p>
                            <svg className="bar-chart" width="300" height="100" xmlns="http://www.w3.org/2000/svg">
                                <rect className="bar" width="30" height="0" x="10" fill="#65A281" />
                                <rect className="bar" width="30" height="0" x="50" fill="#91E2B6" />
                                <rect className="bar" width="30" height="0" x="90" fill="#65A281" />
                                <rect className="bar" width="30" height="0" x="130" fill="#91E2B6" />
                                <rect className="bar" width="30" height="0" x="170" fill="#65A281" />
                                <rect className="bar" width="30" height="0" x="210" fill="#91E2B6" />
                            </svg>
                        </div>
                    </div>
                    <div className="upper-dashboard-user-card">
                        <div className="dashboard-card-header">
                            <h3 className="dashboard-user-card-title">Equipes Ativas</h3>
                            <button className="dashboard-card-btn">Ver Todos</button>
                        </div>
                        <hr className="divider-line" />
                        <div className="dashboard-card-value-container">
                            <p className="dashboard-user-card-value">Visualize o total de <br>
                            </br> formulários respondidos <br>
                            </br> e acompanhe seu progresso!</p>

                            <svg className="doughnut-chart" width="100" height="100" viewBox="0 0 36 36">
                                {/* Full circle background */}
                                <circle
                                    className="doughnut-segment"
                                    cx="18"
                                    cy="18"
                                    r="15.915"
                                    fill="transparent"
                                    stroke="#91E2B6"
                                    strokeWidth="4"
                                />
                                {/* Segment for the first part */}
                                <circle
                                    className="doughnut-segment"
                                    cx="18"
                                    cy="18"
                                    r="15.915"
                                    fill="transparent"
                                    stroke="#65A281"
                                    strokeWidth="4"
                                    strokeDasharray="60 40"
                                    strokeDashoffset="25"   
                                />
                            </svg>
                        </div>
                    </div>
                    <div className="dashboard-user-card">
                        <div className="dashboard-card-header">
                            <h3 className="dashboard-user-card-title">Projetos Concluídos</h3>
                        </div>
                        <hr className="divider-line" />
                        <p className="dashboard-user-card-value">120</p>
                    </div>
                    <div className="dashboard-user-card">
                        <div className="dashboard-card-header">
                            <h3 className="dashboard-user-card-title">Novos Feedbacks</h3>
                        </div>
                        <hr className="divider-line" />
                        <p className="dashboard-user-card-value">15</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardUser;
