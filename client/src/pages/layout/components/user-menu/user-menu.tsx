import { ReactElement, useRef, useState } from 'react';

import { ControlledMenu, MenuItem } from '@szhsin/react-menu';

import style from './user-menu.module.scss';

const MENU_ITEMS = ['Cut', 'Copy', 'Paste'];

export const UserMenu = (): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button className={style.userMenuButton} ref={ref} onClick={() => setIsOpen(true)}>menu</button>
      <ControlledMenu
        state={isOpen ? 'open' : 'closed'}
        onClose={() => setIsOpen(false)}
        direction="bottom"
        className={style.userMenu}
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
