import { ChangeEvent, ReactElement, useState } from 'react';
import { useMedia } from 'react-use';
import classNames from 'classnames';

import { Media } from '@shared/constants';
import { useStore } from '@store/store';

import style from './sidebar.module.scss';

export const Sidebar = (): ReactElement => {
  const [searchValue, setSearchValue] = useState('');
  const { isSidebarMenuOpened, setSidebarMenuState } = useStore();

  const isLaptop = useMedia(Media.LAPTOP);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.currentTarget.value);
  };

  const overlayClickHandler = (): void => {
    setSidebarMenuState(false);
  };

  return (
    <>
      <div
        className={classNames(
          style.sidebar,
          { [style.opened]: isSidebarMenuOpened && !isLaptop },
        )}
      >
        <div className={style.sidebarHeader}>
          <input
            onChange={onInputChange}
            value={searchValue}
            placeholder="Search"
          />
        </div>
      </div>
      {isSidebarMenuOpened && !isLaptop && <div
        onClick={overlayClickHandler}
        className={classNames(
          style.sidebarOverlay,
          { [style.opened]: isSidebarMenuOpened && !isLaptop },
        )}
      />}
    </>
  );
};
