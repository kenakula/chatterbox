import { Document } from 'mongoose';

import { MessageModel } from '@app/core/models';

import { CreateRoomDto, UpdateRoomDto } from '../dto';
import { IRoomsFilter } from '../interfaces';

export interface IRoomsUsecases<T extends Document> {
  createRoom(data: CreateRoomDto): Promise<T>;

  findAll(filter: IRoomsFilter): Promise<T[]>;

  findById(id: string): Promise<T>;

  update(id: string, data: UpdateRoomDto): Promise<T>;

  delete(id: string): Promise<void>;

  saveMessage(roomId: string, message: MessageModel): Promise<void>;

  deleteMessage(roomId: string, messageId: string): Promise<void>;

  clearMessages(roomId: string): Promise<void>;
}
