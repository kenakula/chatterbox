import { ChangeEvent, ReactElement, useRef, useState } from 'react';
import { useClickAway } from 'react-use';

import { useStore } from '@store/store';

interface IProps {
  collapsed: boolean;
  setCollapsed: (state: boolean) => void;
  fix: boolean;
}

export const Sidebar = ({ collapsed, setCollapsed, fix }: IProps): ReactElement | null => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = useState('');

  useClickAway(sidebarRef, () => {
    if (!collapsed) {
      setCollapsed(true);
    }
  });

  const { user } = useStore();

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
      </div>

    </aside>
  );
};
