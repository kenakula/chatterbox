import { IUser } from '../user.interface';

export interface ILoginResponse {
  message: string;
  user: IUser;
}
