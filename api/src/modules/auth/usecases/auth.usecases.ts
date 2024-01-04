import { AuthResultModel } from '@domain/models/auth-result.model';

import { TAuthedUser } from '../interfaces';

export interface IAuthUsecases {
  validateUser(username: string, pass: string): Promise<TAuthedUser | null>;

  login(user: TAuthedUser): Promise<AuthResultModel>;
}
