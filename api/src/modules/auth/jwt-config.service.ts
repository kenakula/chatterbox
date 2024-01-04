import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import { ConfigKey } from '@common/configs';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  createJwtOptions(): Promise<JwtModuleOptions> | JwtModuleOptions {
    const secret = this.config.get<string>(`${ConfigKey.Auth}.jwtSecret`);
    const expiresIn = this.config.get<string>(`${ConfigKey.Auth}.jwtExpires`);

    return {
      secret,
      signOptions: {
        expiresIn,
      },
    };
  }

}
