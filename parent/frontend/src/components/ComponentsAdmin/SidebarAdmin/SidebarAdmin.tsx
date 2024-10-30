import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faUsers,
  faUserFriends,
  faFileAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./SidebarAdmin.css";
import { NavLink } from "react-router-dom";

const SidebarAdmin = () => {
  return (
    <div className="sidebar-admin">
      <div className="logo-sidebar-admin">
      <div className="logo-text">
          <span className="oak">OAK</span>
          <span>RH</span>
        </div>
      </div>

      <div className="profile_container">
        <img src="./profile.png" alt="Perfil do Admin" className="profile_image" />
        <span className="profile_name">Admin Name</span>
        <span className="profile_email">admin@example.com</span>
      </div>

      <ul className="menu-sidebar-admin">
        <li className="menu_span">
          <NavLink
            to="/dashboard-admin"
            className={({ isActive }) => (isActive ? "active_link" : "")}
          >
            <FontAwesomeIcon icon={faTachometerAlt} className="icon-sidebar-admin"/>
            Dashboard
          </NavLink>
        </li>
        <li className="menu_span">
          <NavLink
            to="/funcionarios"
            className={({ isActive }) => (isActive ? "active_link" : "")}
          >
            <FontAwesomeIcon icon={faUserFriends} className="icon-sidebar-admin"/>
            Funcionários
          </NavLink>
        </li>
        <li className="menu_span">
          <NavLink
            to="/equipes-admin"
            className={({ isActive }) => (isActive ? "active_link" : "")}
          >
            <FontAwesomeIcon icon={faUsers} className="icon-sidebar-admin"/>
            Equipes
          </NavLink>
        </li>
        <li className="menu_span">
          <NavLink
            to="/formularios-admin"
            className={({ isActive }) => (isActive ? "active_link" : "")}
          >
            <FontAwesomeIcon icon={faFileAlt} className="icon-sidebar-admin"/>
            Formulários
          </NavLink>
        </li>
      </ul>

      <li className="logout">
        <NavLink to="/" className="logout_link">
          <FontAwesomeIcon icon={faSignOutAlt} />
          Logout
        </NavLink>
      </li>
    </div>
  );
};

export default SidebarAdmin;
