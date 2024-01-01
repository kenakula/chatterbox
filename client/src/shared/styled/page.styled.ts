import { styled } from 'styled-components';

import { globalToken } from '@shared/hooks';

export const Page = styled.section`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 16px;
  border-radius: ${globalToken.borderRadiusLG}px;
  background: ${globalToken.colorBgContainer};
`;
