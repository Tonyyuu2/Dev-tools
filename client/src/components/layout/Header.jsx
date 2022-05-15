import React from "react";
import "./Header.scss";
import mainLogo from "./assets/DEV-TOOL-logos_transparent.png"
import { faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({switch_menu}) => {
    return (
<nav className="navbar navbar-expand-lg navbar-light bg-primary" 
style={{zIndex: "10"}}>
  <div className="container-fluid">
    <a className="navbar-brand" onClick={switch_menu}  href="#"><img src={mainLogo}alt="logo" id="mainLogo" /></a>
    <div className="collapse navbar-collapse d-flex align-items-end" id="navbarNav">
      <ul className="navbar-nav">
      <li className="nav-btn">
            <NavLink
                exact="true"
                activeclassname="active"
                className="search-link"
                to="/search"
            >
                <FontAwesomeIcon icon={faSearch} color="#9fd1bb" />
            </NavLink>
        </li>
        <li className="nav-btn">
            <NavLink
                exact="true"
                activeclassname="active"
                className="profile-link"
                to="/profile"
            >
                <FontAwesomeIcon icon={faUser} color="#9fd1bb" />
            </NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>
    );
};

export default Header;