import { BaseSyntheticEvent, ReactElement } from 'react';
import { Control, Controller } from 'react-hook-form';

import { Input } from '@app/components';
import { Button } from '@components/button/button';
import { ISignUpForm } from '@pages/sign-up-page/interfaces';

import style from '../sign-up.module.scss';

interface IProps {
  onSubmit: (e?: BaseSyntheticEvent | undefined) => Promise<void>;
  control: Control<ISignUpForm>;
}

export const SignUpForm = ({ onSubmit, control }: IProps): ReactElement => {

  return (
    <form className={style.signUpForm} onSubmit={onSubmit}>
      <Controller
        control={control} render={({ field, fieldState }) => (
        <Input label="Username" id="username" {...field} state={fieldState} />
        )} name="username"
      />

      <Controller
        control={control} render={({ field, fieldState }) => (
        <Input label="Password" id="password" {...field} state={fieldState} type="password" />
        )} name="password"
      />

      <Controller
        control={control} render={({ field, fieldState }) => (
        <Input label="Password confirm" id="passwordConfirm" {...field} state={fieldState} type="password" />
        )} name="passwordConfirm"
      />

      <Button type="submit" text="SIGN UP" />
    </form>
  );
};
