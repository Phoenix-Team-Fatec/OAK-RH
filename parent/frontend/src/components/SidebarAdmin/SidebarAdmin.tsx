import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBars,faTimes,faTachometerAlt,faUsers,faUserFriends,faFileAlt,faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import "./SidebarAdmin.css";
import { NavLink } from "react-router-dom";

const SidebarAdmin = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}>
            <div className="logo_sidebar">
                <div>
                    <span className="oak">OAK</span>
                    <span>RH</span>
                </div>
                <div className="hamburguer_sidebar">
                    <FontAwesomeIcon
                        icon={isExpanded ? faTimes : faBars}
                        className="toggle-icon"
                        onClick={toggleSidebar}
                    />
                </div>
            </div>
            <ul className={`menu ${isExpanded ? "" : "collapsed"}`}>
                <li className="menu_span">
                    <NavLink to="/" className={({ isActive }) => (isActive ? "active_link" : "")}>
                        <FontAwesomeIcon icon={faTachometerAlt} />
                        {isExpanded && " Dashboard"}
                    </NavLink>
                </li>
                <li className="menu_span">
                    <NavLink to="/teams" className={({ isActive }) => (isActive ? "active_link" : "")}>
                        <FontAwesomeIcon icon={faUsers} />
                        {isExpanded && " Equipes"}
                    </NavLink>
                </li>
                <li className="menu_span">
                    <NavLink to="/funcionarios" className={({ isActive }) => (isActive ? "active_link" : "")}>
                        <FontAwesomeIcon icon={faUserFriends} />
                        {isExpanded && " Funcionários"}
                    </NavLink>
                </li>
                <li className="menu_span">
                    <NavLink to="/formularios-admin" className={({ isActive }) => (isActive ? "active_link" : "")}>
                        <FontAwesomeIcon icon={faFileAlt} />
                        {isExpanded && " Formulários"}
                    </NavLink>
                </li>
                <li className="profile">
                    <span>Admin</span>
                    <img src="./images.jpg" alt="Perfil do Admin" />
                </li>
                <li className="logout">
                    {isExpanded ? (
                        <span>Logout</span>
                    ) : (
                        <FontAwesomeIcon icon={faSignOutAlt} /> 
                    )}
                </li>
            </ul>
        </div>
    );
};

export default SidebarAdmin;
