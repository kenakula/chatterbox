import { BaseSyntheticEvent, ReactElement } from 'react';
import { Control } from 'react-hook-form';

import { Input } from '@app/components';

import { ILoginForm } from '../interfaces';
import style from '../login.module.scss';

interface IProps {
  onSubmit: (e?: BaseSyntheticEvent | undefined) => Promise<void>;
  control: Control<ILoginForm>;
}

export const LoginForm = ({ onSubmit, control }: IProps): ReactElement => {

  return (
    <form onSubmit={onSubmit} className={style.loginForm}>
      <Input control={control} name="username" id="username"/>
      <Input control={control} name="password" id="password" type="password"/>

      <button type="submit">LOGIN</button>
    </form>
  );
};
