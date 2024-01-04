import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '@common/guards';

import { IPassportRequestInterface } from '@modules/auth/interfaces';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: IPassportRequestInterface) {
    return this.authService.login(req.user);
  }
}
