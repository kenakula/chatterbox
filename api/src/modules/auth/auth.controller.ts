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
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, LocalAuthGuard } from '@common/guards';
import { Response } from 'express';

import { ILoginResult, IPassportRequest } from '@modules/auth/interfaces';

import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly config: ConfigService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req: IPassportRequest,
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
  async getProfile(@Request() req: IPassportRequest) {

    return {
      message: 'JWT auth working',
      user: req.user,
    };
  }

  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Request() req: IPassportRequest) {
    return this.authService.getMe(req.user.id);
  }
}
