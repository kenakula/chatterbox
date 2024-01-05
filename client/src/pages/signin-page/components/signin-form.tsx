import { BaseSyntheticEvent, ReactElement } from 'react';
import { Control } from 'react-hook-form';

import { ISignInForm } from '@pages/signin-page/interfaces';

interface IProps {
  onSubmit: (e?: BaseSyntheticEvent | undefined) => Promise<void>;
  control: Control<ISignInForm>;
}

export const SigninForm = ({ control, onSubmit }: IProps): ReactElement => {

  return (
    <div onSubmit={onSubmit}>
      <input name="username"/>
      <input name="password" type="password"/>
      <input name="passwordConfirm" type="password"/>
      <button>SIGN IN</button>
    </div>
  );
};
