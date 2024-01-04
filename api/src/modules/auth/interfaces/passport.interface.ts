import { Request } from 'express';

import { TAuthedUser } from '@modules/auth/interfaces/authed-user.interface';

export interface IPassportRequest extends Request {
  user: TAuthedUser;
}
