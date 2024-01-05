import { ReactElement } from 'react';
import { FiMenu } from 'react-icons/fi';
import classNames from 'classnames';

import { useStore } from '@store/store';

import { UserMenu } from '../user-menu/user-menu';

import style from './header.module.scss';

export const Header = (): ReactElement => {
  const { isSidebarMenuOpened, setSidebarMenuState } = useStore();

  const handleMenuToggleClick = (): void => {
    setSidebarMenuState(!isSidebarMenuOpened);
  };

  return (
    <header className={classNames(style.header, 'full-width')}>
      <div className={style.headerInner}>
        <UserMenu/>
        <button
          className={style.toggleButton}
          type="button"
          onClick={handleMenuToggleClick}
        >
          <FiMenu/>
        </button>
      </div>
    </header>
  );
};
