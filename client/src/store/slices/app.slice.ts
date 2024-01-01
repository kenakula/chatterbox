import { StateCreator } from 'zustand';

export interface IAppSlice {
  appInitialized: boolean;
  setAppInitialized: (state: boolean) => void;
}

export const createAppSlice: StateCreator<IAppSlice> = (setState) => ({
  appInitialized: false,
  setAppInitialized: (state: boolean) => setState(() => ({ appInitialized: state })),
});
