import { StateCreator } from 'zustand';

import { RoomModel } from '@core/models';

export interface IRoomsSlice {
  rooms: RoomModel[];
}

export const createRoomsSlice: StateCreator<IRoomsSlice> = (setState) => ({
  rooms: [],
  setRooms: (rooms: RoomModel[]) => setState(() => ({ rooms })),
});
