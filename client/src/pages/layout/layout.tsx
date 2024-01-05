import { MouseEvent, ReactElement, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useMedia } from 'react-use';

import { Header } from '@pages/layout/components';
import { Media } from '@shared/constants';

import style from './style.module.scss';

export const Layout = (): ReactElement => {
  const [menuCollapsed, setMenuCollapsed] = useState(true);
  const isLaptop = useMedia(Media.LAPTOP);

  const handleMenuToggleClick = (e: MouseEvent): void => {
    e.preventDefault();
    setMenuCollapsed(prev => !prev);
  };

  return (
    <div className={style.layout}>
      <Header hideMenuToggle={isLaptop} collapsed={menuCollapsed} toggleCollapsed={handleMenuToggleClick}/>
      <main>
        <Outlet/>
      </main>
    </div>
  );
};
