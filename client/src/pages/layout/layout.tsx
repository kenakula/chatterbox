import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import classNames from 'classnames';

import { Header, Sidebar } from '@pages/layout/components';

import style from './layout.module.scss';

export const Layout = (): ReactElement => {

  return (
    <div className={classNames(style.layout, 'grid-layout')}>
      <Sidebar/>
      <Header/>
      <main className="full-width">
        <Outlet/>
      </main>
    </div>
  );
};
