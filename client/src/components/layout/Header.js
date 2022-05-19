import React from 'react';
import classes from './Header.module.css';
import mainLogo from './assets/DEV-TOOL-logos_transparent.png';
import { NavLink } from 'react-router-dom';
import './Header.css'
import about from './assets/about-grey@3x.png'
const Header = ({ switch_menu, boxShadow }) => {

  let boxShadowClass;

  boxShadow ? boxShadowClass = "boxShadow" : boxShadowClass = ""


  return (
    <nav className={ `${classes.navbar} ${boxShadowClass}` }>
      <div>
        <img
          className={ classes.logo }
          src={ mainLogo }
          alt='logo'
          id='mainLogo'
          onClick={ switch_menu }
        />
      </div>

      <ul className={ classes.link__list } >
        <li><NavLink to='about'><img src={about} style={{width:"55px", marginTop: "9px"}}></img></NavLink></li>
      </ul>

    </nav>
  );
};

export default Header;