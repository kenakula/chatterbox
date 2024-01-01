import { ReactElement, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useMedia } from 'react-use';
import { Layout as AntLayout } from 'antd';

import { Header, Sidebar } from '@pages/layout/components';
import { Media } from '@shared/constants';

import * as Styled from './styles';

export const Layout = (): ReactElement => {
  const [menuCollapsed, setMenuCollapsed] = useState(true);
  const isLaptop = useMedia(Media.LAPTOP);

  const handleMenuToggleClick = (): void => {
    setMenuCollapsed(prev => !prev);
  };

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Sidebar collapsed={menuCollapsed} fix={isLaptop} setCollapsed={setMenuCollapsed} />
      <AntLayout>
        <Header hideMenuToggle={isLaptop} collapsed={menuCollapsed} toggleCollapsed={handleMenuToggleClick} />
        <Styled.Content>
          <Outlet />
        </Styled.Content>
      </AntLayout>
    </AntLayout>
  );
};
