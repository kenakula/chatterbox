import { create } from 'zustand';

import { createAppSlice, createAuthSlice, createRoomsSlice, IAppSlice, IAuthSlice, IRoomsSlice } from '@store/slices';

type TStore = IAuthSlice & IAppSlice & IRoomsSlice;

export const useStore = create<TStore>()((...state) => ({
  ...createAuthSlice(...state),
  ...createAppSlice(...state),
  ...createRoomsSlice(...state),
}));
