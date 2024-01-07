import { UserModel } from '@core/models';

export interface ISignInResponse {
  message: string;
  user: UserModel;
}
