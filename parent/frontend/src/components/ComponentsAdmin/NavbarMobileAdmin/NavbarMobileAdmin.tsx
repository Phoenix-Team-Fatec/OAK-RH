import React, { useState } from "react";
import { NavLink } from "react-router-dom";
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
import "./NavbarMobileAdmin.css";
import useUserData from "../../../hooks/useUserData";

const NavbarMobileAdmin = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { nome, email } = useUserData();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      {/* Botão Hamburguer */}
      <div className="navbar-mobile-admin">
        <button className="menu-toggle" onClick={toggleMenu}>
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
        </button>
        <div className="logo-text">
          <span className="oak">OAK</span>
          <span>RH</span>
        </div>
      </div>

      {/* Menu Off-Canvas */}
      <div className={`menu-container ${isMenuOpen ? "open" : ""}`}>
        <div className="profile-container">
          <img
            src="./profile.png"
            alt="Perfil do Admin"
            className="profile-image"
          />
          <span className="profile-name">{nome || "Nome não disponível"}</span>
          <span className="profile-email">{email || "Email não disponível"}</span>
        </div>

        <ul className="menu-list">
          <li>
            <NavLink
              to="/dashboard-admin"
              className={({ isActive }) => (isActive ? "active-link" : "")}
              onClick={toggleMenu}
            >
              <FontAwesomeIcon icon={faTachometerAlt} className="icon" />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/funcionarios"
              className={({ isActive }) => (isActive ? "active-link" : "")}
              onClick={toggleMenu}
            >
              <FontAwesomeIcon icon={faUserFriends} className="icon" />
              Funcionários
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/equipes-admin"
              className={({ isActive }) => (isActive ? "active-link" : "")}
              onClick={toggleMenu}
            >
              <FontAwesomeIcon icon={faUsers} className="icon" />
              Equipes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/formularios-admin"
              className={({ isActive }) => (isActive ? "active-link" : "")}
              onClick={toggleMenu}
            >
              <FontAwesomeIcon icon={faFileAlt} className="icon" />
              Formulários
            </NavLink>
          </li>
          <li className="logout">
            <NavLink to="/" className="logout-link" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faSignOutAlt} />
              Logout
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default NavbarMobileAdmin;
