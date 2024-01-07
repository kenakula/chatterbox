import { ChangeEvent, ReactElement, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { FiPlusCircle } from 'react-icons/fi';
import { useMedia } from 'react-use';
import classNames from 'classnames';

import { Input, RoomCard } from '@app/components';
import { Button } from '@components/button/button';
import { RoomModel } from '@core/models';
import { Media } from '@shared/constants';
import { useStore } from '@store/store';

import { AddRoomModal } from '../add-room-modal';

import style from './sidebar.module.scss';

interface IProps {
  rooms: RoomModel[];
  inputValue: string;
  onInputChange: (value: string) => void;
}

export const Sidebar = ({ rooms, inputValue, onInputChange }: IProps): ReactElement => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isSidebarMenuOpened, setSidebarMenuState } = useStore();

  const isLaptop = useMedia(Media.LAPTOP);

  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onInputChange(event.target.value);
  };

  const onCloseModal = (): void => {
    setIsModalOpen(false);
  };

  const overlayClickHandler = (): void => {
    setSidebarMenuState(false);
  };

  const handleRoomClick = (): void => {
    setSidebarMenuState(false);
  };

  const addRoomHandler = (): void => {
    setSidebarMenuState(false);
    setIsModalOpen(true);
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
            {rooms.map(room => (
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
      <AddRoomModal isModalOpen={isModalOpen} onClose={onCloseModal} />
    </>
  );
};
