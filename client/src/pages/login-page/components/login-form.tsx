import { BaseSyntheticEvent, ReactElement } from 'react';
import { Control } from 'react-hook-form';
import { Button } from 'antd';

import { TextField } from '@app/components';
import * as Styled from '@shared/styled/auth-page.styled';

import { ILoginForm } from '../interfaces';

interface IProps {
  onSubmit: (e?: BaseSyntheticEvent | undefined) => Promise<void>;
  control: Control<ILoginForm>;
}

export const LoginForm = ({ onSubmit, control }: IProps): ReactElement => {

  return (
    <Styled.AuthForm onSubmit={onSubmit}>
      <TextField<ILoginForm> control={control} name="username" inputSize="large" />
      <TextField<ILoginForm> control={control} name="password" type="password" inputSize="large" />

      <Button htmlType="submit" type="primary" size="large">LOGIN</Button>
    </Styled.AuthForm>
  );
};
