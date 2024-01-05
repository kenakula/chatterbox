import { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { authApi } from '@app/api';
import { Paths } from '@app/router';
import { yupResolver } from '@hookform/resolvers/yup';
import { useStore } from '@store/store';

import { SigninForm } from './components';
import { signinSchema } from './constants';
import { ISignInForm } from './interfaces';

export const SigninPage = (): ReactElement => {
  const { setUser, setAuthState } = useStore();

  const { control, reset, handleSubmit } = useForm<ISignInForm>({
    defaultValues: {
      username: '',
      password: '',
      passwordConfirm: '',
    },
    resolver: yupResolver(signinSchema),
  });

  const onSubmit = async (data: ISignInForm): Promise<void> => {
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
    <div>
      <h2>Sign In</h2>
      <SigninForm onSubmit={handleSubmit(onSubmit)} control={control}/>
      <Link to={Paths.LOGIN_PAGE}>
        <button>login</button>
      </Link>
    </div>
  );
};
