import { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

import { authApi } from '@app/api';
import { Paths } from '@app/router';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginForm } from '@pages/login-page/components/login-form';
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
    <div>
      <h2>Login</h2>
      <LoginForm control={control} onSubmit={handleSubmit(onSubmit)}/>
      <Link to={Paths.SIGNIN_PAGE}>
        <button type="button">register</button>
      </Link>
    </div>
  );
};
