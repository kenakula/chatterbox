import { StateCreator } from 'zustand';

import { RoomModel } from '@core/models';

export interface IRoomsSlice {
  rooms: RoomModel[];
  setRooms: (rooms: RoomModel[]) => void;
  currentRoom: RoomModel | null;
  setCurrentRoom: (room: RoomModel) => void;
}

export const createRoomsSlice: StateCreator<IRoomsSlice> = (setState) => ({
  rooms: [],
  setRooms: (rooms: RoomModel[]) => setState(() => ({ rooms })),
  currentRoom: null,
  setCurrentRoom: (currentRoom: RoomModel) => setState(() => ({ currentRoom })),
});
