import { MessageModel } from '@core/models';

export interface ICreateRoomDTO {
  name: string;
  users: string[];
  creator: string;
  description?: string;
  messages: MessageModel[];
}

export type IUpdateRoomDTO = Partial<ICreateRoomDTO>;
