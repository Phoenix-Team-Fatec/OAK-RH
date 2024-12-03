import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faFileAlt,
  faSignOutAlt,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import './NavBarMobileUser.css';
import useUserData from "../../hooks/useUserData";

const NavbarMobileUser= () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { nome, email } = useUserData();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      {/* Botão Hamburguer */}
      <div className="navbar-mobile-user">
        <button className="menu-toggle" onClick={toggleMenu}>
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
        </button>
        <div className="logo-text">
          <span className="oak">OAK</span>
          <span>RH</span>
        </div>
      </div>

      <div className={`menu-container-user ${isMenuOpen ? "open" : ""}`}>
        <div className="profile-container-user">
          <img
            src="./profile.png"
            alt="Perfil do Admin"
            className="profile-image"
          />
          <span className="profile-name">{nome || "Nome não disponível"}</span>
          <span className="profile-email">{email || "Email não disponível"}</span>
        </div>

        <ul className="menu-list-user">
          <li>
            <NavLink
              to="/dashboard-user"
              className={({ isActive }) => (isActive ? "active-link" : "")}
              onClick={toggleMenu}
            >
              <FontAwesomeIcon icon={faTachometerAlt} className="icon" />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/forms-user"
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

export default NavbarMobileUser;
