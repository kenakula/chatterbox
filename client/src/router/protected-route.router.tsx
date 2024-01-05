import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';

export const ProtectedRoute = (): ReactElement => {

  return <Outlet/>;
};
