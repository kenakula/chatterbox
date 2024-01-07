import { StateCreator } from 'zustand';

import { UserModel } from '@core/models';

export interface IAuthSlice {
  user: UserModel | null;
  isAuthenticated: boolean;
  setUser: (user: UserModel) => void;
  setAuthState: (state: boolean) => void;
  logout: () => void;
}

export const createAuthSlice: StateCreator<IAuthSlice> = (setState) => ({
  isAuthenticated: false,
  user: null,
  setUser: (user: UserModel) => setState(() => ({ user })),
  logout: () => setState(() => ({ user: null, isAuthenticated: false })),
  setAuthState: (state: boolean) => setState(() => ({ isAuthenticated: state })),
});
