import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true, virtuals: true })
export class User {
  @Prop()
  id: string;

  @Prop()
  username: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  password: string;

  @Prop()
  passwordConfirm: string;
}

export type TUserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
