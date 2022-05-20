import { NavLink } from 'react-router-dom';
import './SideBar.scss';
import 
{
  FaHome,
  FaMedkit,
  FaMugHot,} from 'react-icons/fa'

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
            <FaMugHot color='#9fd1bb' />
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default SideBar;
