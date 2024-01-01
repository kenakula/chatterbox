import { Button } from 'antd';
import { styled } from 'styled-components';

export const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  width: 100%;
`;

export const ChatWindow = styled.div`
  flex-grow: 1;
`;
export const ChatButton = styled(Button)`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
