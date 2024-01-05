import { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { authApi } from '@app/api';
import { Paths } from '@app/router';
import { yupResolver } from '@hookform/resolvers/yup';
import { useStore } from '@store/store';

import { SignUpForm } from './components';
import { signinSchema } from './constants';
import { ISignUpForm } from './interfaces';
import style from './sign-up.module.scss';

export const SignUpPage = (): ReactElement => {
  const { setUser, setAuthState } = useStore();

  const { control, reset, handleSubmit } = useForm<ISignUpForm>({
    defaultValues: {
      username: '',
      password: '',
      passwordConfirm: '',
    },
    resolver: yupResolver(signinSchema),
  });

  const onSubmit = async (data: ISignUpForm): Promise<void> => {
    try {
      const { data: { user } } = await authApi.signin(data);
      setUser(user);
      setAuthState(true);
      reset();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classNames(style.signUpPage, 'grid-layout')}>
      <div className={style.signUpInner}>
        <h1>Sign Up</h1>
        <SignUpForm onSubmit={handleSubmit(onSubmit)} control={control}/>
        <Link to={Paths.LOGIN_PAGE}>
          login
        </Link>
      </div>
    </div>
  );
};
