import { HTMLProps, ReactElement } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Input } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';

export interface ITextField<T extends FieldValues> extends HTMLProps<HTMLInputElement> {
  control: Control<T>;
  name: Path<T>;
  inputSize?: SizeType
}

export const TextField = <T extends FieldValues>({ control, name, type, inputSize }: ITextField<T>): ReactElement => {

  return (
    <Controller
      render={({ field }) => (
        <Input size={inputSize} type={type} {...field} />
      )} name={name} control={control}
    />
  );
};
