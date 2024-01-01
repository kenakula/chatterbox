import { ChangeEvent, ReactElement, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClickAway, useDebounce, useMedia } from 'react-use';
import { Menu as AntMenu, Skeleton } from 'antd';

import { useUsers } from '@pages/layout/hooks/use-users';
import { IMenuInfo } from '@pages/layout/interfaces';
import { Media } from '@shared/constants';
import { useStore } from '@store/store';

import * as Styled from '../styles';

const SEARCH_DEBOUNCE_TIMEOUT = 500;
const SIDEBAR_TABLET_WIDTH = 50;

interface IProps {
  collapsed: boolean;
  setCollapsed: (state: boolean) => void;
  fix: boolean;
}

export const Sidebar = ({ collapsed, setCollapsed, fix }: IProps): ReactElement | null => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  const [selected, setSelected] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');

  const navigate = useNavigate();

  useClickAway(sidebarRef, () => {
    if (!collapsed) {
      setCollapsed(true);
    }
  });

  const clickHandler = ({ key }: IMenuInfo): void => {
    setSelected(key);
    setCollapsed(true);
    navigate(`chat/${key}`);
  };

  const { user } = useStore();

  const { users, isFetching, isError } = useUsers({ debouncedValue, clickHandler });

  useDebounce(() => {
    setDebouncedValue(searchValue);
  }, SEARCH_DEBOUNCE_TIMEOUT, [searchValue]);

  const isTablet = useMedia(Media.TABLET);
  const showInput = fix ? true : !collapsed;

  const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.currentTarget.value);
  };

  if (!user) return null;

  return (
    <Styled.Sidebar
      collapsed={fix ? false : collapsed}
      trigger={null}
      collapsible
      collapsedWidth={isTablet ? SIDEBAR_TABLET_WIDTH : 0}
      onCollapse={(collapsed) => setCollapsed(collapsed)}
      ref={sidebarRef}
    >
      <Styled.MenuContainer>
        {showInput && (
          <Styled.SearchInput
            onChange={onInputChange}
            value={searchValue}
            placeholder="Search"
            allowClear
            bordered={false}
          />
        )}
        <Styled.SidebarDivider />
        {isFetching ? <Skeleton.Input active size="large" /> : (
          <AntMenu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[selected]}
            items={users}
          />
        )}
        {isError && <span style={{ color: 'tomato' }}>Error</span>}
      </Styled.MenuContainer>

    </Styled.Sidebar>
  );
};
