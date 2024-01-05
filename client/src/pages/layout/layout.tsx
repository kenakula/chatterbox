import { MouseEvent, ReactElement, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useMedia } from 'react-use';

import { Header, Sidebar } from '@pages/layout/components';
import { Media } from '@shared/constants';

export const Layout = (): ReactElement => {
  const [menuCollapsed, setMenuCollapsed] = useState(true);
  const isLaptop = useMedia(Media.LAPTOP);

  const handleMenuToggleClick = (e: MouseEvent): void => {
    e.preventDefault();
    setMenuCollapsed(prev => !prev);
  };

  const handleCollapsed = (state: boolean): void => {

    setMenuCollapsed(state);
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <Sidebar collapsed={menuCollapsed} fix={isLaptop} setCollapsed={handleCollapsed}/>
      <div>
        <Header hideMenuToggle={isLaptop} collapsed={menuCollapsed} toggleCollapsed={handleMenuToggleClick}/>
        <div>
          <Outlet/>
        </div>
      </div>
    </div>
  );
};
