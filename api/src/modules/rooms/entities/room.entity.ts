import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MessageModel } from '@domain/models';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';

import { User } from '@modules/users/entities';

@Schema({ timestamps: true, virtuals: true })
export class Room {
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

  @Prop({
    type: [
      raw({
        id: { type: String },
        text: { type: String },
        sentBy: { type: String },
        timestamp: { type: Number },
      }),
    ],
  })
  messages: MessageModel[];
}

export type TRoomDocument = HydratedDocument<Room>;
export const RoomSchema = SchemaFactory.createForClass(Room);
