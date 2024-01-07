import { ReactElement, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
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
import { IMessageForm } from './interfaces';
import style from './room-page.module.scss';

export const RoomPage = (): ReactElement => {
  const { id: roomId } = useParams<{ id: string }>();

  const { control, handleSubmit, reset } = useForm<IMessageForm>({
    defaultValues: {
      message: '',
    },
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditRoomModalOpened, setIsEditRoomModalOpened] = useState(false);

  const { data: roomData, isError } = useLoadRoom({ roomId });
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

  const onSubmitMessage = async (data: IMessageForm): Promise<void> => {
    if (!data.message) return;

    try {
      const obj = { message: data.message, from: user?.id, to: roomId };
      console.log('=>(room-page.tsx:22) obj', obj);
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
        {roomData && user && <Chat messages={roomData.messages} user={user} />}
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
