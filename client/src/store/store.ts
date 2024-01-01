import { mountStoreDevtool } from 'simple-zustand-devtools';
import { create } from 'zustand';

import { appConfig } from '@app/app.config';
import { createAppSlice, createAuthSlice, IAppSlice, IAuthSlice } from '@store/slices';

type TStore = IAuthSlice & IAppSlice;

export const useStore = create<TStore>()((...state) => ({
  ...createAuthSlice(...state),
  ...createAppSlice(...state),
}));

if (appConfig.mode === 'development') {
  mountStoreDevtool('Store', useStore);
}
