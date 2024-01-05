import { ForwardedRef, forwardRef, ReactElement } from 'react';
import classNames from 'classnames';

import style from './avatar.module.scss';

interface IProps {
  name: string;
  src?: string;
  onClick?: () => void;
  className?: string;
}

const Component = ({ src, name, onClick, className }: IProps, ref: ForwardedRef<HTMLButtonElement>): ReactElement => {

  return (
    <button ref={ref} onClick={onClick} className={classNames(style.avatar, { classname: !!className })}>
      {src ? <img src={src} alt={name}/> : name[0].toUpperCase()}
    </button>
  );
};

export const Avatar = forwardRef<HTMLButtonElement, IProps>(Component);




