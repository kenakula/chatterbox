import { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

import { authApi } from '@app/api';
import { Paths } from '@app/router';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginForm } from '@pages/login-page/components/login-form';
import * as Styled from '@shared/styled/auth-page.styled';
import { useStore } from '@store/store';

import { loginSchema } from './constants';
import { ILoginForm } from './interfaces';

export const LoginPage = (): ReactElement => {
  const { setUser, setAuthState } = useStore();

  const { handleSubmit, control, reset } = useForm<ILoginForm>({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: ILoginForm): Promise<void> => {
    try {
      const { data: { user } } = await authApi.login(data);
      setUser(user);
      setAuthState(true);
      reset();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Styled.AuthPageWrapper>
      <Styled.AuthPageTitle>Login</Styled.AuthPageTitle>
      <LoginForm control={control} onSubmit={handleSubmit(onSubmit)} />
      <Link to={Paths.SIGNIN_PAGE}>
        <Button type="link">register</Button>
      </Link>
    </Styled.AuthPageWrapper>
  );
};
