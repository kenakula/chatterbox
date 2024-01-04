import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { HashingService } from '@common/helpers';

import { UsersModule } from '@modules/users';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtConfigService } from './jwt-config.service';
import { LocalStrategy } from './strategies';

@Module({
  providers: [AuthService, LocalStrategy, JwtConfigService, HashingService],
  controllers: [AuthController],
  imports: [
    UsersModule, PassportModule, JwtModule.registerAsync({
      useClass: JwtConfigService,
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {
}
