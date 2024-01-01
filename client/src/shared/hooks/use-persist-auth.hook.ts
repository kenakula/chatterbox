import { useCallback, useEffect, useRef } from 'react';

import { usersApi } from '@app/api/users.api';
import { useStore } from '@store/store';

export const usePersistAuth = (): void => {
  const isFetching = useRef<boolean>(false);
  const { setAuthState, setUser, user, setAppInitialized } = useStore();

  const getAuthedUserInfo = useCallback(async (): Promise<void> => {
    try {
      isFetching.current = true;
      const { data } = await usersApi.getMe();
      setUser(data);
      setAuthState(true);
    } catch (err) {
      isFetching.current = false;
      console.error(err);
    } finally {
      setAppInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (!user && !isFetching.current) {
      getAuthedUserInfo();
      isFetching.current = true;
    }
  }, []);
};
