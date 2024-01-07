import { ReactElement, useEffect, useRef, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { Controller, useForm } from 'react-hook-form';
import { IoMdSend } from 'react-icons/io';
import { IoMdExit } from 'react-icons/io';
import { MdOutlineModeEdit } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

import { appConfig } from '@app/app.config';
import { Input } from '@app/components';
import { Paths } from '@app/router';
import { Button } from '@components/button/button';
import { MessageModel } from '@core/models';
import { Chat, EditRoomModal } from '@pages/room-page/components';
import { useStore } from '@store/store';

import { useLoadRoom } from './hooks';
import { IMessageForm, TSocket } from './interfaces';
import style from './room-page.module.scss';

export const RoomPage = (): ReactElement => {
  const chatRef = useRef<Scrollbars>(null);
  const socketInst = useRef<TSocket | null>(null);
  const { id: roomId } = useParams<{ id: string }>();

  const { control, handleSubmit, reset } = useForm<IMessageForm>({
    defaultValues: {
      message: '',
    },
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditRoomModalOpened, setIsEditRoomModalOpened] = useState(false);

  const { data: roomData, isError, messages, addMessage } = useLoadRoom({ roomId });
  const { user } = useStore();

  const navigate = useNavigate();

  const joinRoom = (socket: TSocket): void => {
    socket.emit('joinRoom', { roomId: roomId ?? '', user: user?.id ?? '' });
    socket.on('chatMessage', (data) => {
      console.log('=>(room-page.tsx:45) data', data);
      addMessage(data.message);
    });
  };

  useEffect(() => {
    if (!socketInst.current) {
      socketInst.current = io(appConfig.appUrl, { transports: ['websocket'], rejectUnauthorized: false });
      joinRoom(socketInst.current);
    }
  }, []);

  const onEditRoomModalOpen = (): void => {
    setIsEditRoomModalOpened(true);
  };

  const onEditRoomModalClose = (): void => {
    setIsEditRoomModalOpened(false);
  };

  const onExitRoom = (): void => {
    navigate(Paths.MAIN_PAGE);
  };

  const onSubmitMessage = async (data: IMessageForm): Promise<void> => {
    if (!data.message) return;

    try {
      const message = new MessageModel();
      message.messageId = uuidv4();
      message.text = data.message;
      message.sentBy = user?.id ?? '';
      message.timestamp = Date.now();

      socketInst.current?.emit('chatMessage', { roomId: roomId ?? '', message });

      reset();
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
          {roomData && <h1 className={style.pageTitle}>{roomData.name}</h1>}
          <Button
            icon={<MdOutlineModeEdit />}
            onClick={onEditRoomModalOpen}
            variant="ghost"
            className={style.editButton}
          />
        </div>
        {roomData && user && <Chat ref={chatRef} messages={messages.slice().reverse()} user={user} />}
        <form className={style.inputWrapper} onSubmit={handleSubmit(onSubmitMessage)}>
          <Controller
            control={control}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                state={fieldState}
                className={style.messageInput}
                name="chatBox"
                style={{ resize: 'none' }}
                ref={inputRef}
                autoComplete="off"
              />
            )} name="message"
          />
          <Button type="submit" icon={<IoMdSend />} variant="ghost" />
        </form>
      </div>
      <EditRoomModal isOpen={isEditRoomModalOpened} handleClose={onEditRoomModalClose} />
    </section>
  );
};
