import { ReactElement } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import classNames from 'classnames';

import { Avatar } from '@app/components';
import { MessageModel } from '@core/models';

import style from './chat.module.scss';

interface IProps {
  list: MessageModel[];
  userId: string;
  username: string;
}

export const Messages = ({ list, userId, username }: IProps): ReactElement => {
  const getSenderName = (senderId: string): string => userId === senderId ? username : 'Q';

  return (
    <Scrollbars className={style.chatInner}>
      {list.map(({ messageId, text, timestamp, sentBy }) => (
        <div key={messageId} className={classNames(style.message, { [style.foreign]: sentBy !== userId })}>
          <Avatar
            name={getSenderName(sentBy)}
            background={sentBy !== userId ? 'rgba(var(--color-green--rgb), 0.1)' : undefined}
          />
          <div className={classNames(style.messageText, { [style.foreign]: sentBy !== userId })}>
            <p>{text}</p>
            <span>{new Date(timestamp).toLocaleDateString()}</span>
          </div>
        </div>
      ))}
    </Scrollbars>
  );
};
