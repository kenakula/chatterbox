import { ReactElement } from 'react';
import { IoMdExit } from 'react-icons/io';
import { MdOutlineModeEdit } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';

import { Paths } from '@app/router';
import { Button } from '@components/button/button';
import { Chat } from '@pages/room-page/components';
import { useStore } from '@store/store';

import { useLoadRoom } from './hooks';
import style from './room-page.module.scss';

export const RoomPage = (): ReactElement => {
  const { id: roomId } = useParams<{ id: string }>();

  const { data: roomData, isError, messages, addMessage } = useLoadRoom({ roomId });
  const { user, setRoomModalOpenState, setRoomModalMode } = useStore();

  const navigate = useNavigate();

  const renderChat = !!(roomId && roomData && user);

  const onEditRoomModalOpen = (): void => {
    setRoomModalMode('edit');
    setRoomModalOpenState(true);
  };

  const onExitRoom = (): void => {
    navigate(Paths.MAIN_PAGE);
  };

  if (isError) {
    return <p>Error</p>;
  }

  return (
    <section className={style.roomPage}>
      <div className={style.pageWrapper}>
        <div className={style.pageHeader}>
          <Button icon={<IoMdExit />} variant="ghost" className={style.exitButton} onClick={onExitRoom} />
          {roomData && <h1 className={style.pageTitle}>{roomData.name}</h1>}
          <Button
            icon={<MdOutlineModeEdit />}
            onClick={onEditRoomModalOpen}
            variant="ghost"
            className={style.editButton}
          />
        </div>
        {renderChat && <Chat
          addMessage={addMessage}
          roomId={roomId}
          messages={messages.slice().reverse()}
          user={user}
        />}
      </div>
    </section>
  );
};
