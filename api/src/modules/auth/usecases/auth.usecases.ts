import { ILoginResult, TAuthedUser } from '../interfaces';

export interface IAuthUsecases {
  validateUser(username: string, pass: string): Promise<TAuthedUser | null>;

  login(user: TAuthedUser): Promise<ILoginResult>;
}
