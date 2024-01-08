import { ChangeEvent, ReactElement } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { FiPlusCircle } from 'react-icons/fi';
import { useMedia } from 'react-use';
import classNames from 'classnames';

import { Input, RoomCard } from '@app/components';
import { Button } from '@components/button/button';
import { Media } from '@shared/constants';
import { useStore } from '@store/store';

import style from './sidebar.module.scss';

interface IProps {
  inputValue: string;
  onInputChange: (value: string) => void;
}

export const Sidebar = ({ inputValue, onInputChange }: IProps): ReactElement => {

  const { isSidebarMenuOpened, setSidebarMenuState, rooms, setRoomModalOpenState, setRoomModalMode } = useStore();

  const isLaptop = useMedia(Media.LAPTOP);

  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onInputChange(event.target.value);
  };

  const overlayClickHandler = (): void => {
    setSidebarMenuState(false);
  };

  const handleRoomClick = (): void => {
    setSidebarMenuState(false);
  };

  const addRoomHandler = (): void => {
    setSidebarMenuState(false);
    setRoomModalMode('create');
    setRoomModalOpenState(true);
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
          <Input
            name="roomSearch"
            onChange={onChange}
            value={inputValue}
            placeholder="Search"
            className={style.searchInput}
          />
          <Button
            icon={<FiPlusCircle />}
            aria-label="New room"
            type="button"
            className={style.addRoomButton}
            onClick={addRoomHandler}
            variant="ghost"
          />
        </div>
        <Scrollbars autoHide>
          <ul className={style.sidebarList}>
            {rooms && rooms.map(room => (
              <li key={room.id}>
                <RoomCard data={room} onClick={handleRoomClick} />
              </li>
            ))}
          </ul>
        </Scrollbars>
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
