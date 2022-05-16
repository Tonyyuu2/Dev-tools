import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import './Layout.scss';
import Header from './Header';
import { useState } from 'react';

const Layout = () => {
  const [showMenu, setShowMenu] = useState(false);

  function switch_menu() {
    setShowMenu(!showMenu);
  }

  return (
    <>
      <div className='App'>
        <SideBar switch_menu={switch_menu} showMenu={showMenu} />
      </div>
      <Header switch_menu={switch_menu} />
      <Outlet className='outlet' />
    </>
  );
};

export default Layout;
