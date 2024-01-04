import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
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
}

export type TUserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  }
});
