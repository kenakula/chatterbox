import { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { authApi } from '@app/api';
import { Paths } from '@app/router';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginForm } from '@pages/login-page/components/login-form';
import { useStore } from '@store/store';

import { loginSchema } from './constants';
import { ILoginForm } from './interfaces';
import style from './login.module.scss';

export const LoginPage = (): ReactElement => {
  const { setAuthState } = useStore();

  const { handleSubmit, control, reset } = useForm<ILoginForm>({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: ILoginForm): Promise<void> => {
    try {
      const { data: { refreshToken } } = await authApi.login(data);
      console.log(refreshToken);
      setAuthState(true);
      reset();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className={classNames(style.loginPage, 'grid-layout')}>
      <div className={style.loginInner}>
        <h1>Login Page</h1>
        <LoginForm control={control} onSubmit={handleSubmit(onSubmit)} />
        <Link to={Paths.SIGNIN_PAGE}>
          register
        </Link>
      </div>
    </main>
  );
};
