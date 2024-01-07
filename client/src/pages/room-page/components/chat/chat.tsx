import { ReactElement, useCallback, useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { IoMdSend } from 'react-icons/io';
import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

import { appConfig } from '@app/app.config';
import { Input } from '@app/components';
import { Button } from '@components/button/button';
import { MessageModel, UserModel } from '@core/models';
import { IMessageForm, TSocket } from '@pages/room-page/interfaces';

import style from './chat.module.scss';
import { Messages } from './messages';

interface IProps {
  messages: MessageModel[];
  user: UserModel;
  roomId: string;
  addMessage: (message: MessageModel) => void;
}

export const Chat = ({ messages, user, roomId, addMessage }: IProps): ReactElement => {
  const socketInst = useRef<TSocket | null>(null);

  const { control, handleSubmit, reset } = useForm<IMessageForm>({
    defaultValues: {
      message: '',
    },
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmitMessage = async (data: IMessageForm): Promise<void> => {
    if (!data.message) return;

    try {
      const message = new MessageModel();
      message.messageId = uuidv4();
      message.text = data.message;
      message.sentBy = user?.id ?? '';
      message.timestamp = Date.now();

      socketInst.current?.emit('chatMessage', { roomId, message });

      reset();
    } catch (err) {
      console.error(err);
    }
  };

  const joinRoom = useCallback((socket: TSocket): void => {
    socket.emit('joinRoom', { roomId, user: user.id });
    socket.on('chatMessage', (data) => {
      addMessage(data.message);
    });
  }, [addMessage, roomId, user.id]);

  useEffect(() => {
    socketInst.current = io(appConfig.appUrl, { transports: ['websocket'], rejectUnauthorized: false });
    joinRoom(socketInst.current);

    return () => {
      socketInst.current?.disconnect();
      socketInst.current = null;
    };
  }, [roomId]);

  return (
    <>
      <div className={style.chat}>
        <Messages username={user.username} userId={user.id} list={messages} />
      </div>
      <form className={style.footer} onSubmit={handleSubmit(onSubmitMessage)}>
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
    </>
  );
};
