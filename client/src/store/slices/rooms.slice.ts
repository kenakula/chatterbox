import { StateCreator } from 'zustand';

import { RoomModel } from '@core/models';

type TRoomModalMode = 'create' | 'edit';

export interface IRoomsSlice {
  rooms: RoomModel[];
  setRooms: (rooms: RoomModel[]) => void;
  addRoom: (room: RoomModel) => void;
  currentRoom: RoomModel | null;
  setCurrentRoom: (room: RoomModel | null) => void;
  isRoomModalOpened: boolean;
  setRoomModalOpenState: (state: boolean) => void;
  roomModalMode: TRoomModalMode;
  setRoomModalMode: (mode: TRoomModalMode) => void;
  updateRoom: (room: RoomModel) => void;
}

export const createRoomsSlice: StateCreator<IRoomsSlice> = (setState) => ({
  rooms: [],
  setRooms: (rooms: RoomModel[]) => setState(() => ({ rooms })),
  addRoom: (room: RoomModel) => setState((state) => ({ rooms: [...state.rooms, room] })),
  currentRoom: null,
  setCurrentRoom: (currentRoom: RoomModel | null) => setState(() => ({ currentRoom })),
  isRoomModalOpened: false,
  setRoomModalOpenState: (state: boolean) => setState(() => ({ isRoomModalOpened: state })),
  roomModalMode: 'create',
  setRoomModalMode: (mode: TRoomModalMode) => setState(() => ({ roomModalMode: mode })),
  updateRoom: (room: RoomModel) => setState(state => {
    for (let i = 0; i < state.rooms.length; i++) {
      if (state.rooms[i].id === room.id) {
        return { rooms: [...state.rooms.slice(0, i), room, ...state.rooms.slice(i + 1)] };
      }
    }

    return { rooms: state.rooms };
  }),
});
