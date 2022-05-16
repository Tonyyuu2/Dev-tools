import React from 'react';
import classes from './Header.module.css';
import mainLogo from './assets/DEV-TOOL-logos_transparent.png';
import { NavLink } from 'react-router-dom';

const Header = ({ switch_menu }) => {
  return (
    <nav className={ classes.navbar } style={ { zIndex: '10' } }>
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
        <li><NavLink to='about'>About us</NavLink></li>
        <li><NavLink to='logout'>Logout</NavLink></li>
      </ul>

    </nav>
  );
};

export default Header;