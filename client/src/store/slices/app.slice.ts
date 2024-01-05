import { StateCreator } from 'zustand';

export interface IAppSlice {
  appInitialized: boolean;
  setAppInitialized: (state: boolean) => void;
  isSidebarMenuOpened: boolean;
  setSidebarMenuState: (state: boolean) => void;
}

export const createAppSlice: StateCreator<IAppSlice> = (setState) => ({
  appInitialized: false,
  setAppInitialized: (state: boolean) => setState(() => ({ appInitialized: state })),
  isSidebarMenuOpened: false,
  setSidebarMenuState: (state: boolean) => setState(() => ({ isSidebarMenuOpened: state })),
});
