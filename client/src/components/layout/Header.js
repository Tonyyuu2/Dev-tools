import React, { useContext } from 'react';
import classes from './Header.module.css';
import mainLogo from './assets/logo-green_1@3x.png';
import { NavLink } from 'react-router-dom';
import './Header.css';
import AuthContext from '../store/auth-context';


const Header = ({ switch_menu, boxShadow }) => {

  const ctx = useContext(AuthContext);

  let boxShadowClass;

  boxShadow ? boxShadowClass = "boxShadow" : boxShadowClass = "";


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
        { ctx.token && <li>Hello, { ctx.username } !</li> }
        { !ctx.token && <li><NavLink to='/login'>Login</NavLink></li> }
        { !ctx.token && <li><NavLink to='/register'>Register</NavLink></li> }
        { ctx.token && <li onClick={ ctx.onLogout }><NavLink to='/'>Logout</NavLink></li> }
        <li>
        <NavLink to='about'>About</NavLink>
        </li>
      </ul>

    </nav>
  );
};

export default Header;