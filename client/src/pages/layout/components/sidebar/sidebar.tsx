import { ChangeEvent, ReactElement } from 'react';
import { useMedia } from 'react-use';
import classNames from 'classnames';

import { RoomModel } from '@core/models';
import { Media } from '@shared/constants';
import { useStore } from '@store/store';

import style from './sidebar.module.scss';

interface IProps {
  rooms: RoomModel[];
  inputValue: string;
  onInputChange: (value: string) => void;
}

export const Sidebar = ({ rooms, inputValue, onInputChange }: IProps): ReactElement => {

  const { isSidebarMenuOpened, setSidebarMenuState } = useStore();

  const isLaptop = useMedia(Media.LAPTOP);

  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onInputChange(event.target.value);
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
            onChange={onChange}
            value={inputValue}
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
