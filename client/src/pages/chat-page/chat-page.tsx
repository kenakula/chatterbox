import { ChangeEvent, ReactElement, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useCountLines } from '@shared/hooks';
import { useStore } from '@store/store';

export const ChatPage = (): ReactElement => {
  const { id: recipientId } = useParams<{ id: string }>();

  const inputRef = useRef<HTMLInputElement>(null);

  const { user } = useStore();

  const [message, setMessage] = useState('');

  const { lines } = useCountLines({ inputRef, value: message, maxLines: 3 });

  const onMessageChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    setMessage(evt.target.value);
  };

  const onMessageSend = async (): Promise<void> => {
    try {
      const obj = { message, from: user?._id, to: recipientId };
      console.log('=>(chat-page.tsx:31) obj', obj);
      setMessage('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section>
      <div>
        <div>chat</div>
        <div>
          <input
            style={{ resize: 'none' }}
            ref={inputRef}
            onChange={onMessageChange}
            value={message}
          />
          <button type="button">x</button>
          <button onClick={onMessageSend} type="button">P</button>
        </div>
      </div>
    </section>
  );
};
