import { ForwardedRef, forwardRef, HTMLProps, ReactElement, useId } from 'react';
import { ControllerFieldState } from 'react-hook-form';
import classNames from 'classnames';

import style from './input.module.scss';

export interface IInput extends HTMLProps<HTMLInputElement> {
  label?: string;
  state?: ControllerFieldState;
}

const InputComponent = (
  { className, label, id, state, ...rest }: IInput,
  ref: ForwardedRef<HTMLInputElement>,
): ReactElement => {
  const inputId = useId();

  return (
    <div className={classNames(style.inputWrapper, { [className ?? '']: className })}>
      {label && <label htmlFor={id ?? inputId}>{label}</label>}
      <input
        className={classNames(style.input, { [style.invalid]: !!state?.error })} {...rest}
        id={id ?? inputId}
        ref={ref}
      />
      {state?.error && state?.error.message && <span className={style.inputHelperText}>{state.error.message}</span>}
    </div>
  );
};

export const Input = forwardRef(InputComponent);
