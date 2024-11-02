import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBars,faTimes,faTachometerAlt, faFileAlt,faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import "./SidebarUser.css";
import { NavLink } from "react-router-dom";

const SidebarUser = () => {
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
                    <NavLink to="/dashboard-user" className={({ isActive }) => (isActive ? "active_link" : "")}>
                        <FontAwesomeIcon icon={faTachometerAlt} />
                        {isExpanded && " Dashboard"}
                    </NavLink>
                </li>
                <li className="menu_span">
                    <NavLink to="/lista-formularios" className={({ isActive }) => (isActive ? "active_link" : "")}>
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

export default SidebarUser;