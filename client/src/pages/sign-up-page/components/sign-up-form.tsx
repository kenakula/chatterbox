import { BaseSyntheticEvent, ReactElement } from 'react';
import { Control } from 'react-hook-form';

import { Input } from '@app/components';
import { ISignUpForm } from '@pages/sign-up-page/interfaces';

import style from '../sign-up.module.scss';

interface IProps {
  onSubmit: (e?: BaseSyntheticEvent | undefined) => Promise<void>;
  control: Control<ISignUpForm>;
}

export const SignUpForm = ({ onSubmit, control }: IProps): ReactElement => {

  return (
    <form className={style.signUpForm} onSubmit={onSubmit}>
      <Input control={control} name="username" id="username"/>
      <Input control={control} name="password" id="password" type="password"/>
      <Input control={control} name="passwordConfirm" id="passwordConfirm" type="password"/>

      <button>SIGN UP</button>
    </form>
  );
};
