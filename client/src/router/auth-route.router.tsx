import { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { Paths } from '@app/router/constants.router';
import { useStore } from '@store/store';

export const AuthRoute = (): ReactElement => {
  const { isAuthenticated } = useStore();

  if (isAuthenticated) {
    return <Navigate to={Paths.MAIN_PAGE}/>;
  }

  return <Outlet/>;
};
