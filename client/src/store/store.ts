import { mountStoreDevtool } from 'simple-zustand-devtools';
import { create } from 'zustand';

import { appConfig } from '@app/app.config';
import { createAppSlice, createAuthSlice, createRoomsSlice, IAppSlice, IAuthSlice, IRoomsSlice } from '@store/slices';

type TStore = IAuthSlice & IAppSlice & IRoomsSlice;

export const useStore = create<TStore>()((...state) => ({
  ...createAuthSlice(...state),
  ...createAppSlice(...state),
  ...createRoomsSlice(...state),
}));

if (appConfig.mode === 'development') {
  mountStoreDevtool('Store', useStore);
}
