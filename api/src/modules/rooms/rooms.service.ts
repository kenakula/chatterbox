import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateRoomDto, SaveMessageDto, UpdateRoomDto } from '@modules/rooms/dto';
import { Room, TRoomDocument } from '@modules/rooms/entities';
import { IRoomsUsecases } from '@modules/rooms/usecases';

@Injectable()
export class RoomsService implements IRoomsUsecases<TRoomDocument> {
  constructor(@InjectModel(Room.name) private readonly roomModel: Model<Room>) {}

  createRoom(data: CreateRoomDto): Promise<TRoomDocument> {
    return this.roomModel.create(data);
  }

  async delete(id: string): Promise<void> {
    const room = await this.roomModel.findByIdAndDelete(id);

    if (!room) {
      throw new NotFoundException('Room with defined id not found');
    }
  }

  async findAll(): Promise<TRoomDocument[]> {
    return this.roomModel.find()
      .populate({ path: 'creator' })
      .populate({ path: 'users' });
  }

  async findById(id: string): Promise<TRoomDocument> {
    const room = await this.roomModel.findById(id)
      .populate({ path: 'creator' })
      .populate({ path: 'users' });

    if (!room) {
      throw new NotFoundException('Room with defined id not found');
    }

    return room;
  }

  async update(id: string, data: UpdateRoomDto): Promise<TRoomDocument> {
    const room = await this.roomModel.findByIdAndUpdate(id, data);

    if (!room) {
      throw new NotFoundException('Room with defined id not found');
    }

    return this.roomModel.findById(room.id)
      .populate({ path: 'creator' })
      .populate({ path: 'users' });
  }

  async saveMessage(roomId: string, message: SaveMessageDto): Promise<void> {
    const room = await this.roomModel.findById(roomId);
    room.messages.push(message);
    await room.save();
  }

  async deleteMessage(roomId: string, messageId: string): Promise<void> {
    const room = await this.roomModel.findById(roomId);

    room.messages = room.messages
      .slice()
      .filter(message => message.messageId !== messageId);

    await room.save();
  }

  async clearMessages(roomId: string): Promise<void> {
    await this.roomModel.findByIdAndUpdate(roomId, { messages: [] });
  }
}
