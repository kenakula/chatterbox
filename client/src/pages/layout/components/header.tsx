import { ReactElement } from 'react';

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import * as Styled from '@pages/layout/styles';

interface IProps {
  collapsed: boolean;
  toggleCollapsed: () => void;
  hideMenuToggle: boolean;
}

export const Header = ({ collapsed, toggleCollapsed, hideMenuToggle }: IProps): ReactElement => {

  return (
    <Styled.Header>
      {!hideMenuToggle && (
        <Styled.MenuButton
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={toggleCollapsed}
        />
      )}
    </Styled.Header>
  );
};
