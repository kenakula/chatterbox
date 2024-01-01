import { StateCreator } from 'zustand';

import { IUser } from '@shared/interfaces';

export interface IAuthSlice {
  user: IUser | null;
  isAuthenticated: boolean;
  setUser: (user: IUser) => void;
  setAuthState: (state: boolean) => void;
  logout: () => void;
}

export const createAuthSlice: StateCreator<IAuthSlice> = (setState) => ({
  isAuthenticated: false,
  user: null,
  setUser: (user: IUser) => setState(() => ({ user })),
  logout: () => setState(() => ({ user: null, isAuthenticated: false })),
  setAuthState: (state: boolean) => setState(() => ({ isAuthenticated: state }))
});
