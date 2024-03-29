import { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AppRouter } from '@app/router/app.router';
import { usePersistAuth } from '@shared/hooks';
import { useStore } from '@store/store';

export const App = (): ReactElement | null => {
  const { appInitialized } = useStore();

  usePersistAuth();

  if (!appInitialized) {
    return null;
  }

  return (
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
  );
};
