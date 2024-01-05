import { ChangeEvent, ReactElement, useState } from 'react';
import { useMedia } from 'react-use';
import classNames from 'classnames';

import { RoomModel } from '@core/models';
import { Media } from '@shared/constants';
import { useStore } from '@store/store';

import style from './sidebar.module.scss';

interface IProps {
  rooms: RoomModel[];
}

export const Sidebar = ({ rooms }: IProps): ReactElement => {
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
      <nav
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
        <ul>
          {rooms.map(room => (
            <li key={room.id}>{room.name}</li>
          ))}
        </ul>
      </nav>
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
