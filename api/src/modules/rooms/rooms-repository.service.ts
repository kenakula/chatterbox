import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MessageModel, RoomModel } from '@domain/models';
import { IRoomRepository } from '@domain/repositories';
import { Model } from 'mongoose';

import { Room, TRoomDocument } from '@modules/rooms/entities';

@Injectable()
export class RoomsRepository implements IRoomRepository<TRoomDocument> {
  constructor(@InjectModel(Room.name) private readonly roomModel: Model<Room>) {
  }

  addUser(roomId: string, userId: string): void {
  }

  createRoom(userId: string, roomName?: string): RoomModel {
    return undefined;
  }

  deleteById(id: string): void {
  }

  editMessage(roomId: string, messageId: string, text: string): MessageModel {
    return undefined;
  }

  findAll(): RoomModel[] {
    return [];
  }

  findById(id: string): RoomModel {
    return undefined;
  }

  removeMessage(roomId: string, messageId: string): void {
  }

  removeUser(roomId: string, userId: string): void {
  }

  saveMessage(roomId: string, message: MessageModel): MessageModel {
    return undefined;
  }

  toRoomModel(doc: TRoomDocument): RoomModel {
    return undefined;
  }

  updateById(id: string, data: Partial<RoomModel>): RoomModel {
    return undefined;
  }

}
