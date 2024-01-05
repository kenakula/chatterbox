import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import classNames from 'classnames';

import { Header, Sidebar } from '@pages/layout/components';

import { useGetRooms } from './hooks';
import style from './layout.module.scss';

export const Layout = (): ReactElement => {
  const { data, inputValue, onInputChange } = useGetRooms();

  return (
    <div className={classNames(style.layout, 'grid-layout')}>
      <Header/>
      <Sidebar rooms={data} inputValue={inputValue} onInputChange={onInputChange}/>
      <main className={classNames('full-width', style.mainContent)}>
        <Outlet/>
      </main>
    </div>
  );
};
