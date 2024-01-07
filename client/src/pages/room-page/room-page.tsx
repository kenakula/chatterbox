import { ChangeEvent, ReactElement, useRef, useState } from 'react';
import { IoMdSend } from 'react-icons/io';
import { IoMdExit } from 'react-icons/io';
import { MdOutlineModeEdit } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';

import { Input } from '@app/components';
import { Paths } from '@app/router';
import { Button } from '@components/button/button';
import { Chat, EditRoomModal } from '@pages/room-page/components';
import { useStore } from '@store/store';

import { useLoadRoom } from './hooks';
import style from './room-page.module.scss';

export const RoomPage = (): ReactElement => {
  const { id: roomId } = useParams<{ id: string }>();

  const inputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState('');
  const [isEditRoomModalOpened, setIsEditRoomModalOpened] = useState(false);

  const { data, isError } = useLoadRoom({ roomId });
  const { user } = useStore();

  const navigate = useNavigate();

  const onEditRoomModalOpen = (): void => {
    setIsEditRoomModalOpened(true);
  };

  const onEditRoomModalClose = (): void => {
    setIsEditRoomModalOpened(false);
  };

  const onExitRoom = (): void => {
    navigate(Paths.MAIN_PAGE);
  };

  const onMessageChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    setMessage(evt.target.value);
  };

  const onMessageSend = async (): Promise<void> => {
    try {
      const obj = { message, from: user?.id, to: roomId };
      console.log('=>(room-page.tsx:22) obj', obj);
      setMessage('');
    } catch (err) {
      console.error(err);
    }
  };

  if (isError) {
    return <p>Error</p>;
  }

  return (
    <section className={style.roomPage}>
      <div className={style.pageWrapper}>
        <div className={style.pageHeader}>
          <Button icon={<IoMdExit />} variant="ghost" className={style.exitButton} onClick={onExitRoom} />
          {data && <h1 className={style.pageTitle}>{data.name}</h1>}
          <Button
            icon={<MdOutlineModeEdit />}
            onClick={onEditRoomModalOpen}
            variant="ghost"
            className={style.editButton}
          />
        </div>
        {data && user && <Chat messages={data.messages} user={user} />}
        <form className={style.inputWrapper}>
          <Input
            className={style.messageInput}
            name="chatBox"
            style={{ resize: 'none' }}
            ref={inputRef}
            onChange={onMessageChange}
            value={message}
          />
          <Button onClick={onMessageSend} type="submit" icon={<IoMdSend />} variant="ghost" />
        </form>
      </div>
      <EditRoomModal isOpen={isEditRoomModalOpened} handleClose={onEditRoomModalClose} />
    </section>
  );
};
