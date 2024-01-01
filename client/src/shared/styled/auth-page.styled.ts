import { Typography } from 'antd';
import { styled } from 'styled-components';

export const AuthPageWrapper = styled.div`
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  row-gap: 24px;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
`;

export const AuthPageTitle = styled(Typography.Title)`
  margin: 0;
  text-align: center;
`;

export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  min-width: 320px;
`;
