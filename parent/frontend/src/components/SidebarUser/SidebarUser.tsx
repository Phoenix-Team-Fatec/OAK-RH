import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faUsers,
  faUserFriends,
  faFileAlt,
  faSignOutAlt,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import "./SidebarUser.css";
import { NavLink } from "react-router-dom";
import useUserData from "../../hooks/useUserData";

const SidebarUser = ({ isExpanded, toggleSidebar }) => {
  const { nome, email } = useUserData();

  return (
    <div className={`sidebar-user ${isExpanded ? "expanded" : "collapsed"}`}>
      <div className="toggle-container">
        {isExpanded && (
          <div className="logo-sidebar-user">
            <div className="logo-text">
              <span className="oak">OAK</span>
              <span>RH</span>
            </div>
          </div>
        )}
        <div
          className={`toggle-button ${isExpanded ? "expanded" : ""}`}
          onClick={toggleSidebar}
        >
          <FontAwesomeIcon icon={isExpanded ? faTimes : faBars} />
        </div>
      </div>

      {isExpanded && (
        <div className="profile_container">
          <img
            src="./profile-w.png"
            alt="Perfil do User"
            className="profile_image"
          />
          <span className="profile_name">{nome || "Nome não disponível"}</span>
          <span className="profile_email">{email || "Email não disponível"}</span>
        </div>
      )}

      <ul className="menu-sidebar-user">
        <li className="menu_span">
          <NavLink
            to="/dashboard-user"
            className={({ isActive }) => (isActive ? "active_link" : "")}
          >
            <FontAwesomeIcon icon={faTachometerAlt} className="icon-sidebar-user" />
            {isExpanded && "Dashboard"}
          </NavLink>
        </li>
        <li className="menu_span">
          <NavLink
            to="/formularios-user"
            className={({ isActive }) => (isActive ? "active_link" : "")}
          >
            <FontAwesomeIcon icon={faFileAlt} className="icon-sidebar-user" />
            {isExpanded && "Formulários"}
          </NavLink>
        </li>
      </ul>

      <li className="logout">
        <NavLink to="/" className="logout_link">
          <FontAwesomeIcon icon={faSignOutAlt} />
          {isExpanded && "Logout"}
        </NavLink>
      </li>
    </div>
  );
};

export default SidebarUser;
