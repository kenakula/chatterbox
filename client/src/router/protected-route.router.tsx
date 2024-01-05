import { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useStore } from '@store/store';

import { Paths } from './constants.router';
import { historyHelper } from './utils';

export const ProtectedRoute = (): ReactElement => {
  const { isAuthenticated } = useStore();

  if (!isAuthenticated) {
    return <Navigate to={Paths.LOGIN_PAGE} state={{ from: historyHelper.location }}/>;
  }

  return <Outlet/>;
};
