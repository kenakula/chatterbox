import { IContact } from './contact.interface';

export interface IUser {
  _id: string;
  username: string;
  chats: string[];
  contacts: IContact[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserFilter {
  username?: string;
}
