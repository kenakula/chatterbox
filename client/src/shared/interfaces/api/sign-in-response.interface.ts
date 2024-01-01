import { IUser } from '@shared/interfaces';

export interface ISignInResponse {
  message: string;
  user: IUser;
}
