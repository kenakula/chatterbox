import { ReactElement } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { ChatPage, Layout, LoginPage, MainPage, SignUpPage } from '@app/pages';
import { AuthRoute } from '@app/router/auth-route.router';

import { Paths } from './constants.router';
import { ProtectedRoute } from './protected-route.router';
import { historyHelper } from './utils';

export const AppRouter = (): ReactElement => {
  historyHelper.navigate = useNavigate();
  historyHelper.location = useLocation();

  return (
    <Routes>
      <Route element={<ProtectedRoute/>}>
        <Route element={<Layout/>}>
          <Route path={Paths.MAIN_PAGE} index element={<MainPage/>}/>
          <Route path={Paths.CHAT_PAGE} index element={<ChatPage/>}/>
        </Route>
      </Route>
      <Route element={<AuthRoute/>}>
        <Route path={Paths.LOGIN_PAGE} element={<LoginPage/>}/>
        <Route path={Paths.SIGNIN_PAGE} element={<SignUpPage/>}/>
      </Route>
    </Routes>
  );
};
