import { BaseSyntheticEvent, ReactElement } from 'react';
import { Control } from 'react-hook-form';
import { Button } from 'antd';

import { TextField } from '@app/components';
import { ISignInForm } from '@pages/signin-page/interfaces';
import * as Styled from '@shared/styled/auth-page.styled';

interface IProps {
  onSubmit: (e?: BaseSyntheticEvent | undefined) => Promise<void>;
  control: Control<ISignInForm>;
}

export const SigninForm = ({ control, onSubmit }: IProps): ReactElement => {

  return (
    <Styled.AuthForm onSubmit={onSubmit}>
      <TextField<ISignInForm> control={control} name="username" inputSize="large" />
      <TextField<ISignInForm> control={control} name="password" inputSize="large" type="password" />
      <TextField<ISignInForm> control={control} name="passwordConfirm" inputSize="large" type="password" />
      <Button htmlType="submit" size="large" type="primary">SIGN IN</Button>
    </Styled.AuthForm>
  );
};
