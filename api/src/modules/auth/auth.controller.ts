import {
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard, LocalAuthGuard } from '@common/guards';
import { Response } from 'express';

import { ILoginResult, IPassportRequestInterface } from '@modules/auth/interfaces';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly config: ConfigService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req: IPassportRequestInterface,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Pick<ILoginResult, 'refreshToken'>> {
    const { authToken, refreshToken } = await this.authService.login(req.user);
    const cookieName = this.config.get<string>('AUTH.jwtCookieName');

    if (!cookieName) {
      throw new InternalServerErrorException();
    }

    res.cookie(cookieName, authToken);

    return { refreshToken };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req: IPassportRequestInterface) {

    return {
      message: 'JWT auth working',
      user: req.user,
    };
  }
}
