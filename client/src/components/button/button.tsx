import { HTMLProps, ReactElement, ReactNode, useMemo } from 'react';
import classNames from 'classnames';

import style from './button.module.scss';

type TButtonVariant = 'primary' | 'ghost' | 'outlined';

interface IProps extends HTMLProps<HTMLButtonElement> {
  text?: string;
  type?: 'submit' | 'button' | 'reset';
  icon?: ReactNode;
  fullWidth?: boolean;
  variant?: TButtonVariant;
  formId?: string;
}

export const Button = ({
  type,
  href,
  text,
  icon,
  formId,
  onClick,
  className,
  disabled = false,
  fullWidth = false,
  variant = 'primary',
}: IProps): ReactElement => {
  const variantClass = useMemo((): string => {
    return classNames({
      [style.primary]: variant === 'primary',
      [style.ghost]: variant === 'ghost',
      [style.outlined]: variant === 'outlined',
      [style.disabled]: disabled,
    });
  }, [variant]);

  if (href) {
    return (
      <a
        href={href}
        className={classNames(
          style.button,
          variantClass,
          { [className ?? '']: !!className, [style.fullWidth]: fullWidth },
        )}
      >
        <span className={style.buttonText}>{text}</span>
      </a>
    );
  }

  return (
    <button
      type={formId ? 'submit' : type}
      className={classNames(
        style.button,
        variantClass,
        { [style.buttonIcon]: !!icon, [className ?? '']: !!className, [style.fullWidth]: fullWidth },
      )}
      onClick={onClick}
      form={formId}
    >
      {icon && icon}
      {text && <span className={style.buttonText}>{text}</span>}
    </button>
  );
};
