import { ReactElement } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';

import { Avatar } from '@app/components';
import { MessageModel, UserModel } from '@core/models';

import style from './chat.module.scss';

interface IProps {
  messages: MessageModel[];
  user: UserModel;
}

export const Chat = ({ messages }: IProps): ReactElement => {

  return (
    <div className={style.chat}>
      <Scrollbars>
        <div className={style.chatInner}>
          {messages.map(m => (
            <div key={m.messageId} className={style.message}>
              <Avatar name="some-name"/>
              <div className={style.messageText}>
                {m.text}
              </div>
            </div>
          ))}
        </div>
      </Scrollbars>
    </div>
  );
};
