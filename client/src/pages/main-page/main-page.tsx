import { ReactElement } from 'react';

import { authApi } from '@app/api';
import { useStore } from '@store/store';

export const MainPage = (): ReactElement => {
  const { logout } = useStore();
  const handleLogout = async (): Promise<void> => {
    try {
      await authApi.logout();
      logout();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div>Main Page</div>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};
