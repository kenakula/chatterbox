import { Path } from 'react-hook-form';

export type TFieldType = 'input' | 'textarea' | 'checkbox' | 'radio';
export type TInputType = 'text' | 'password' | 'email' | 'tel';

export interface IFormField<T> {
  name: Path<T>;
  type: TFieldType;
  placeholder?: string;
  label?: string;
  inputType?: TInputType;
  disabled?: boolean;
}
