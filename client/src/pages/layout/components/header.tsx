import { MouseEvent, ReactElement } from 'react';

interface IProps {
  collapsed: boolean;
  toggleCollapsed: (e: MouseEvent) => void;
  hideMenuToggle: boolean;
}

export const Header = ({ toggleCollapsed, hideMenuToggle }: IProps): ReactElement => {

  return (
    <header>
      {!hideMenuToggle && (
        <button
          type="button"
          onClick={toggleCollapsed}
        >toggle</button>
      )}
    </header>
  );
};
