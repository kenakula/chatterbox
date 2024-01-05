import { MessageModel } from './message.model';
import { UserModel } from './user.model';

export class RoomModel {
  id: string;

  name: string;

  description: string;

  creator: UserModel;

  isActive: boolean;

  users: UserModel[];

  messages: MessageModel[];
}
