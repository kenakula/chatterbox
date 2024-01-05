import { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useStore } from '@store/store';

import { Paths } from './constants.router';

export const AuthRoute = (): ReactElement => {
  const { isAuthenticated } = useStore();

  if (isAuthenticated) {
    return <Navigate to={Paths.MAIN_PAGE}/>;
  }

  return <Outlet/>;
};
