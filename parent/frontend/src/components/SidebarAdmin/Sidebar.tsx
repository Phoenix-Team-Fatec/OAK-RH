import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faTachometerAlt, faUsers, faUserFriends, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}>
            <div className="logo_sidebar">
                <span className="oak">OAK</span>
                <span>RH</span>
                <FontAwesomeIcon
                    icon={isExpanded ? faTimes : faBars}
                    className="toggle-icon"
                    onClick={toggleSidebar}
                />
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
                    <NavLink to="/forms" className={({ isActive }) => (isActive ? "active_link" : "")}>
                        <FontAwesomeIcon icon={faFileAlt} />
                        {isExpanded && " Formulários"}
                    </NavLink>
                </li>
                <li className="profile">
                    <span>Admin</span>
                    <img src="./images/images.jpg" alt="Perfil do Admin" />
                </li>
                <li className="logout">
                    <span>Logout</span>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
