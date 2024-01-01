import { ChangeEvent, ReactElement, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Flex, Input } from 'antd';
import { TextAreaRef } from 'antd/es/input/TextArea';

import { PlusSquareOutlined, SendOutlined } from '@ant-design/icons';
import { useCountLines } from '@shared/hooks';
import { Page } from '@shared/styled/page.styled';
import { useStore } from '@store/store';

import * as Styled from './styles';

export const ChatPage = (): ReactElement => {
  const { id: recipientId } = useParams<{ id: string }>();

  const inputRef = useRef<TextAreaRef>(null);

  const { user } = useStore();

  const [message, setMessage] = useState('');

  const { lines } = useCountLines({ inputRef, value: message, maxLines: 3 });

  const onMessageChange = (evt: ChangeEvent<HTMLTextAreaElement>): void => {
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
    <Page>
      <Styled.ChatWrapper>
        <Styled.ChatWindow>chat</Styled.ChatWindow>
        <Flex gap="small" align="flex-end">
          <Input.TextArea
            style={{ resize: 'none' }}
            rows={lines}
            ref={inputRef}
            onChange={onMessageChange}
            value={message}
          />
          <Styled.ChatButton icon={<PlusSquareOutlined />} type="text" />
          <Styled.ChatButton icon={<SendOutlined />} onClick={onMessageSend} type="primary" />
        </Flex>
      </Styled.ChatWrapper>
    </Page>
  );
};
