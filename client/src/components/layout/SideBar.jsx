import { Link, NavLink } from 'react-router-dom';
import './SideBar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faClock, faHome, faLock, faMedkit, faMugHot, faUser } from '@fortawesome/free-solid-svg-icons';


  const SideBar = ({switch_menu, showMenu}) => {

      return (
        <div onClick={switch_menu} className={`nav_container ${showMenu ? 'menu_active' : null}`} id="nav-slide">
          <div className="nav-bar">
            <nav>
              <NavLink exact="true" activeclassname="active" to="/">
                <FontAwesomeIcon icon={faHome} color="#9fd1bb" />
              </NavLink>
              <NavLink
                exact="true"
                activeclassname="active"
                className="timer-link"
                to="/timer"
              >
                <FontAwesomeIcon icon={faClock} color="#9fd1bb" />
              </NavLink>
              <NavLink
                exact="true"
                activeclassname="active"
                className="wecare-link"
                to="/backcare"
              >
                <FontAwesomeIcon icon={ faMedkit } color="#9fd1bb" />
              </NavLink>
              <NavLink
                exact="true"
                activeclassname="active"
                className="break-link"
                to="/break"
              >
                <FontAwesomeIcon icon={faMugHot} color="#9fd1bb" />
              </NavLink>
            </nav>
          </div>
        </div>
      )
    };

    export default SideBar;
    