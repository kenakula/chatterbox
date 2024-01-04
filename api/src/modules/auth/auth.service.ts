import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashingService } from '@common/helpers';
import { UserModel } from '@core/models';

import { SignupDto } from '@modules/auth/dto';
import { IAuthResult, IJwtPayloadInterface, TAuthedUser } from '@modules/auth/interfaces';
import { TUserDocument } from '@modules/users/entities';
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
      const { password, ...result } = this.toUserModel(user);

      return result;
    }

    return null;
  }

  async login(user: TAuthedUser): Promise<IAuthResult> {
    const payload: IJwtPayloadInterface = { username: user.username, sub: user.id };

    return {
      refreshToken: this.jwtService.sign(payload),
      authToken: this.jwtService.sign(payload),
    };
  }

  async signup({ passwordConfirm, ...rest }: SignupDto): Promise<IAuthResult> {
    if (passwordConfirm !== rest.password) {
      throw new BadRequestException('Passwords do not match');
    }

    const user = await this.usersService.createUser(rest);
    const payload: IJwtPayloadInterface = { username: user.username, sub: user._id.toString() };

    return {
      refreshToken: this.jwtService.sign(payload),
      authToken: this.jwtService.sign(payload),
    };
  }

  async getMe(userId: string): Promise<UserModel> {
    const doc = await this.usersService.findById(userId);

    return this.toUserModel(doc);
  }

  private toUserModel(doc: TUserDocument): UserModel {
    const model = new UserModel();
    model.username = doc.username;
    model.isActive = doc.isActive;
    model.id = doc._id.toString();

    return model;
  }
}
