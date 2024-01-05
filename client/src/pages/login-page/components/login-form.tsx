import { BaseSyntheticEvent, ReactElement } from 'react';
import { Control } from 'react-hook-form';

import { ILoginForm } from '../interfaces';

interface IProps {
  onSubmit: (e?: BaseSyntheticEvent | undefined) => Promise<void>;
  control: Control<ILoginForm>;
}

export const LoginForm = ({ onSubmit, control }: IProps): ReactElement => {

  return (
    <form onSubmit={onSubmit}>
      <input name="username"/>
      <input name="password" type="password"/>

      <button type="submit">LOGIN</button>
    </form>
  );
};
