import { Request } from '@nestjs/common';

import { TAuthedUser } from '@modules/auth/interfaces/authed-user.interface';

export interface IPassportRequestInterface extends Request {
  user: TAuthedUser;
}
