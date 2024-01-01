import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';

import { User } from '@modules/users/entities';

@Schema({ timestamps: true, virtuals: true })
export class Room {
  @Prop({ unique: true })
  roomId: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  creator: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  users: User[];

  @Prop(raw({}))
  messages: Record<string, string>;
}

export type TRoomDocument = HydratedDocument<Room>;
export const RoomSchema = SchemaFactory.createForClass(Room);
