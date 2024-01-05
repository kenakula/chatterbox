import { ForwardedRef, forwardRef, ReactElement } from 'react';

interface IProps {
  name: string;
  src?: string;
}

const Component = ({ src, name }: IProps, ref: ForwardedRef<HTMLButtonElement>): ReactElement => {
  const buttonContent = src ? <img src={src} alt={name}/> : name[0].toUpperCase();

  return (
    <button ref={ref}>
      {buttonContent}
    </button>
  );
};

export const Avatar = forwardRef<HTMLButtonElement, IProps>(Component);




