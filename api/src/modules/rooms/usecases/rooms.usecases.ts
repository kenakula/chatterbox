import { MessageModel } from '@domain/models';
import { Document } from 'mongoose';

import { CreateRoomDto, UpdateRoomDto } from '@modules/rooms/dto';

export interface IRoomsUsecases<T extends Document> {
  createRoom(data: CreateRoomDto): Promise<T>;

  findAll(): Promise<T[]>;

  findById(id: string): Promise<T>;

  update(id: string, data: UpdateRoomDto): Promise<T>;

  delete(id: string): Promise<void>;

  saveMessage(roomId: string, message: MessageModel): Promise<void>;

  deleteMessage(roomId: string, messageId: string): Promise<void>;

  clearMessages(roomId: string): Promise<void>;
}
