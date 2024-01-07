import { ReactElement, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';

import { authApi } from '@app/api';
import { Avatar } from '@app/components';
import { IMenuItem } from '@shared/interfaces';
import { useStore } from '@store/store';
import { ControlledMenu, MenuItem } from '@szhsin/react-menu';

import style from './user-menu.module.scss';

export const UserMenu = (): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  const { logout, user } = useStore();

  const handleLogout = async (): Promise<void> => {
    try {
      await authApi.logout();
      logout();
    } catch (err) {
      console.error(err);
    }
  };

  const MENU_ITEMS: IMenuItem[] = useMemo(() => ([
    {
      label: 'Logout',
      className: style.danger,
      onClick: handleLogout,
    },
  ]), []);

  const handleMenuOpen = (): void => {
    setIsOpen(true);
  };

  return (
    <>
      {user && <Avatar name={user.username} onClick={handleMenuOpen} ref={ref} />}
      <ControlledMenu
        state={isOpen ? 'open' : 'closed'}
        onClose={() => setIsOpen(false)}
        direction="bottom"
        className={style.userMenu}
        align="start"
        gap={16}
        arrow
        anchorRef={ref}
      >
        {MENU_ITEMS.map(({ label, className, onClick }) => (
          <MenuItem
            className={classNames(style.userMenuItem, { [className ?? '']: className })}
            key={label}
            onClick={onClick}
          >{label}</MenuItem>
        ))}
      </ControlledMenu>
    </>
  );
};
