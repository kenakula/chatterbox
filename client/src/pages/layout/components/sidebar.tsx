import { ChangeEvent, ReactElement, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClickAway, useDebounce, useMedia } from 'react-use';

import { useUsers } from '@pages/layout/hooks/use-users';
import { IMenuInfo } from '@pages/layout/interfaces';
import { Media } from '@shared/constants';
import { useStore } from '@store/store';

const SEARCH_DEBOUNCE_TIMEOUT = 500;

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
    <aside
      ref={sidebarRef}
    >
      <div>
        {showInput && (
          <input
            onChange={onInputChange}
            value={searchValue}
            placeholder="Search"
          />
        )}
        <hr/>
      </div>

    </aside>
  );
};
