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
import "./SidebarAdmin.css";
import { NavLink } from "react-router-dom";
import useUserData from "../../../hooks/useUserData";

const SidebarAdmin = ({ isExpanded, toggleSidebar }) => {
  const { nome, email } = useUserData();

  return (
    <div className={`sidebar-admin ${isExpanded ? "expanded" : "collapsed"}`}>
      <div className="toggle-container">
        {isExpanded && (
          <div className="logo-sidebar-admin">
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
            src="./profile.png"
            alt="Perfil do Admin"
            className="profile_image"
          />
          <span className="profile_name">{nome || "Nome não disponível"}</span>
          <span className="profile_email">{email || "Email não disponível"}</span>
        </div>
      )}

      <ul className="menu-sidebar-admin">
        <li className="menu_span">
          <NavLink
            to="/dashboard-admin"
            className={({ isActive }) => (isActive ? "active_link" : "")}
          >
            <FontAwesomeIcon icon={faTachometerAlt} className="icon-sidebar-admin" />
            {isExpanded && "Dashboard"}
          </NavLink>
        </li>
        <li className="menu_span">
          <NavLink
            to="/funcionarios"
            className={({ isActive }) => (isActive ? "active_link" : "")}
          >
            <FontAwesomeIcon icon={faUserFriends} className="icon-sidebar-admin" />
            {isExpanded && "Funcionários"}
          </NavLink>
        </li>
        <li className="menu_span">
          <NavLink
            to="/equipes-admin"
            className={({ isActive }) => (isActive ? "active_link" : "")}
          >
            <FontAwesomeIcon icon={faUsers} className="icon-sidebar-admin" />
            {isExpanded && "Equipes"}
          </NavLink>
        </li>
        <li className="menu_span">
          <NavLink
            to="/formularios-admin"
            className={({ isActive }) => (isActive ? "active_link" : "")}
          >
            <FontAwesomeIcon icon={faFileAlt} className="icon-sidebar-admin" />
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

export default SidebarAdmin;
