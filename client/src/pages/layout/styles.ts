import { Button, Divider, Input, Layout } from 'antd';
import { styled } from 'styled-components';

import { Media } from '@shared/constants';
import { globalToken } from '@shared/hooks';

import { ISidebarSettings } from './interfaces';

export const Sidebar = styled(Layout.Sider)<ISidebarSettings>`
  position: fixed !important;
  min-height: 100%;
  max-height: 100vh;
  overflow-y: auto;
  padding: ${({ collapsed }) => collapsed ? '0' : '10px 5px'};
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media ${Media.TABLET} {
    position: relative !important;
  }
`;

export const Content = styled(Layout.Content)`
  margin: 24px 16px;
  min-height: 280px;
`;

export const Header = styled(Layout.Header)`
  height: 50px;
  display: flex;
  flex-direction: row-reverse;
  padding: 0;
  background-color: ${globalToken.colorBgContainer};
`;

export const MenuButton = styled(Button)`
  && {
    font-size: 16px;
    width: 50px;
    height: 50px;
  }
`;

export const MenuContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

export const SearchInput = styled(Input)`
  position: sticky;
  top: 0;
  left: 0;
  z-index: ${globalToken.zIndexBase + 1};
  background-color: ${globalToken.colorBgContainer};

  &:hover {
    background-color: ${globalToken.colorBgContainer};
  }
`;

export const SidebarDivider = styled(Divider)`
  margin: 0;
  border-color: ${globalToken.colorBgContainer};
  opacity: 0.3;
`;
