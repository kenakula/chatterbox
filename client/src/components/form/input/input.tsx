import { HTMLProps, ReactElement } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

import style from './style.module.scss';

export interface IInput<T extends FieldValues> extends HTMLProps<HTMLInputElement> {
  control: Control<T>;
  name: Path<T>;
}

export const Input = <T extends FieldValues>({ control, name, ...rest }: IInput<T>): ReactElement => {

  return (
    <Controller
      render={({ field }) => (
        <input className={style.input} {...field} {...rest}/>
      )}
      name={name}
      control={control}
    />
  );
};
