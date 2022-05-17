import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import './Layout.scss';
import Header from './Header';
import { useState } from 'react';

const Layout = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [boxShadow, setBoxShadow] = useState(true);


  function switch_menu() {
    setShowMenu(!showMenu);
    setBoxShadow(!boxShadow)
  }

  return (
    <>
      <div className='App'>
        <SideBar switch_menu={switch_menu} showMenu={showMenu} />
      </div>
      <Header switch_menu={switch_menu} boxShadow={boxShadow} />
      <Outlet className='outlet' />
    </>
  );
};

export default Layout;
