import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashingService } from '@common/helpers';

import { AuthResultModel } from '@app/core/models/auth-result.model';
import { IJwtPayloadInterface, TAuthedUser } from '@modules/auth/interfaces';
import { UsersService } from '@modules/users/users.service';

import { IAuthUsecases } from './usecases';

@Injectable()
export class AuthService implements IAuthUsecases {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly hashingService: HashingService,
  ) {}

  async validateUser(username: string, pass: string): Promise<TAuthedUser | null> {
    const user = await this.usersService.findByUsername(username);
    const isPassValid = await this.hashingService.compare(pass, user.password);

    if (user && isPassValid) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async login(user: TAuthedUser): Promise<AuthResultModel> {
    const payload: IJwtPayloadInterface = { username: user.username, sub: user.id };

    return {
      refreshToken: this.jwtService.sign(payload),
    };
  }
}
