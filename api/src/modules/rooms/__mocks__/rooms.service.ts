import { createRoomStub } from '@modules/rooms/tests/room.stub';

export const RoomsService = jest.fn().mockReturnValue({
  createRoom: jest.fn().mockResolvedValue(createRoomStub()),
  delete: jest.fn(),
  findAll: jest.fn().mockReturnValue([createRoomStub(), createRoomStub(), createRoomStub()]),
  findById: jest.fn().mockResolvedValue(createRoomStub()),
  update: jest.fn().mockResolvedValue(createRoomStub()),
});
