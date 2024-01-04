import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigKey } from '@common/configs';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { IJwtPayloadInterface } from '@modules/auth/interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const cookieName = config.get<string>('AUTH.jwtCookieName');

          return request.cookies[cookieName];
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: config.get<string>(`${ConfigKey.Auth}.jwtSecret`),
    });
  }

  async validate(payload: IJwtPayloadInterface) {
    return { id: payload.sub, username: payload.username };
  }
}
