import { MessageModel, RoomModel } from '@domain/models';

export interface IRoomRepository<T> {
  createRoom(userId: string, roomName?: string): RoomModel;

  findAll(): RoomModel[];

  findById(id: string): RoomModel;

  updateById(id: string, data: Partial<RoomModel>): RoomModel;

  deleteById(id: string): void;

  toRoomModel(doc: T): RoomModel;

  saveMessage(roomId: string, message: MessageModel): MessageModel;

  editMessage(roomId: string, messageId: string, text: string): MessageModel;

  removeMessage(roomId: string, messageId: string): void;

  addUser(roomId: string, userId: string): void;

  removeUser(roomId: string, userId: string): void;
}
