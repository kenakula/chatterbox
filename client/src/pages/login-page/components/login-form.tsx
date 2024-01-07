import { BaseSyntheticEvent, ReactElement } from 'react';
import { Control, Controller } from 'react-hook-form';

import { Input } from '@app/components';
import { Button } from '@components/button/button';

import { ILoginForm } from '../interfaces';
import style from '../login.module.scss';

interface IProps {
  onSubmit: (e?: BaseSyntheticEvent | undefined) => Promise<void>;
  control: Control<ILoginForm>;
}

export const LoginForm = ({ onSubmit, control }: IProps): ReactElement => {

  return (
    <form onSubmit={onSubmit} className={style.loginForm}>
      <Controller
        control={control}
        render={({ field, fieldState }) => (
          <Input label="Username" id="username" {...field} state={fieldState} />
        )} name="username"
      />

      <Controller
        control={control}
        render={({ field, fieldState }) => (
          <Input label="Password" {...field} id="password" type="password" state={fieldState} />
        )} name="password"
      />

      <Button type="submit" text="LOGIN" />
    </form>
  );
};
