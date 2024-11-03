import React, { useState } from "react";
import "./DashboardUser.css";
import SidebarUser from "../../../components/SidebarUser/SidebarUser";

const DashboardUser: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(true);

    const toggleSidebar = () => {
        setIsExpanded((prevState) => !prevState);
    };

    return (
        <div className="dashboard-user-wrapper">
            <SidebarUser isExpanded={isExpanded} toggleSidebar={toggleSidebar} />

            {/* Fake Navbar */}
            <div className={`navbar ${isExpanded ? "expanded" : "collapsed"}`}>
                <span className="navbar-title">
                    {isExpanded ? "Dashboard" : "Dashboard"}
                </span>
                <select className={`navbar-select ${isExpanded ? "expanded" : "collapsed"}`}>
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
                                <rect className="bar" width="30" height="0" x="210" fill="#91E2B6" /> {/* New bar */}
                            </svg>

                        </div>

                    </div>
                    <div className="upper-dashboard-user-card">
                        <div className="dashboard-card-header">
                            <h3 className="dashboard-user-card-title">Equipes Ativas</h3>
                            <button className="dashboard-card-btn">Ver Todos</button>
                        </div>
                        <hr className="divider-line" />
                        <p className="dashboard-user-card-value">24</p>
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
