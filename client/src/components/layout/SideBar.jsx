import { NavLink } from 'react-router-dom';
import './SideBar.scss';
import 
{
  FaHome,
  FaMedkit,
  } from 'react-icons/fa'
  import {IoNewspaper} from 'react-icons/io5'


const SideBar = ({ switch_menu, showMenu }) => {
  return (
    <div
      onClick={switch_menu}
      className={`nav_container ${showMenu ? 'menu_active' : null}`}
      id='nav-slide'
    >
      <div className='nav-bar'>
        <nav>
          <NavLink exact='true' activeclassname='active' to='/'>
            <FaHome color='#9fd1bb' />
          </NavLink>
          <NavLink
            exact='true'
            activeclassname='active'
            className='wecare-link'
            to='/backcare'
          >
            <FaMedkit color='#9fd1bb' />
          </NavLink>
          <NavLink
            exact='true'
            activeclassname='active'
            className='break-link'
            to='/break'
          >
            <IoNewspaper color='#9fd1bb'/>
          </NavLink>
        </nav>
        <p className='copy-right'>Copyright © 2022 DevTools, Inc. <br/>All rights reserved.</p>
      </div>
    </div>
  );
};

export default SideBar;
