import { ReactElement, useRef, useState } from 'react';

import { Avatar } from '@app/components';
import { ControlledMenu, MenuItem } from '@szhsin/react-menu';

import style from './user-menu.module.scss';

export const UserMenu = (): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  const MENU_ITEMS = ['Cut', 'Copy', 'Paste'];

  const handleMenuOpen = (): void => {
    setIsOpen(true);
  };

  return (
    <>
      <Avatar name="menu" onClick={handleMenuOpen} ref={ref}/>
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
        {MENU_ITEMS.map(item => (
          <MenuItem className={style.userMenuItem} key={item}>{item}</MenuItem>
        ))}
      </ControlledMenu>
    </>
  );
};
