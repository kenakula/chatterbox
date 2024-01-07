import { ForwardedRef, forwardRef, ReactElement } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import classNames from 'classnames';

import { Avatar } from '@app/components';
import { MessageModel, UserModel } from '@core/models';

import style from './chat.module.scss';

interface IProps {
  messages: MessageModel[];
  user: UserModel;
}

const Component = ({ messages, user }: IProps, ref: ForwardedRef<Scrollbars>): ReactElement => {
  const getSenderName = (senderId: string): string => user.id === senderId ? user.username : 'Q';

  return (
    <div className={style.chat}>
      <Scrollbars ref={ref} className={style.chatInner}>
        {messages.map(({ messageId, text, timestamp, sentBy }) => (
          <div key={messageId} className={classNames(style.message, { [style.foreign]: sentBy === user.id })}>
            <Avatar name={getSenderName(sentBy)} />
            <div className={classNames(style.messageText, { [style.foreign]: sentBy === user.id })}>
              <p>{text}</p>
              <span>{new Date(timestamp).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </Scrollbars>
    </div>
  );
};

export const Chat = forwardRef<Scrollbars, IProps>(Component);
