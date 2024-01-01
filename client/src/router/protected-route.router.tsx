import { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { Paths } from '@app/router/constants.router';
import { historyHelper } from '@app/router/utils';
import { useStore } from '@store/store';

export const ProtectedRoute = (): ReactElement => {
  const { isAuthenticated } = useStore();

  if (!isAuthenticated) {
    return <Navigate to={Paths.LOGIN_PAGE} state={{ from: historyHelper.location }}/>;
  }

  return <Outlet/>;
};
