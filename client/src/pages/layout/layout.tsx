import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import classNames from 'classnames';

import { RoomModal } from '@components/modals';
import { Header, Sidebar } from '@pages/layout/components';
import { usePersistAuth } from '@shared/hooks';

import { useGetRooms } from './hooks';
import style from './layout.module.scss';

export const Layout = (): ReactElement => {
  const { inputValue, onInputChange } = useGetRooms();

  usePersistAuth();

  return (
    <div className={classNames(style.layout, 'grid-layout')}>
      <Header />
      <Sidebar inputValue={inputValue} onInputChange={onInputChange} />
      <main className={classNames('full-width', style.mainContent)}>
        <Outlet />
      </main>
      <RoomModal />
    </div>
  );
};
