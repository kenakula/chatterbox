import { HTMLProps, ReactElement } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

export interface ITextField<T extends FieldValues> extends HTMLProps<HTMLInputElement> {
  control: Control<T>;
  name: Path<T>;
}

export const TextField = <T extends FieldValues>({ control, name }: ITextField<T>): ReactElement => {

  return (
    <Controller
      render={({ field }) => (
        <input {...field} />
      )} name={name} control={control}
    />
  );
};
