import { registerAs } from '@nestjs/config';
import * as process from 'process';

import { ConfigKey, Environment } from './enums';

const AppConfig = registerAs(
  ConfigKey.App, () => ({
    env:
      Environment[process.env.NODE_ENV as keyof typeof Environment] ||
      'development',
    port: Number(process.env.APP_PORT),
    appName: process.env.APP_NAME,
  }),
);

const DbConfig = registerAs(
  ConfigKey.Database, () => ({
    host: process.env.MONGO_HOST,
    port: Number(process.env.MONGO_PORT),
    username: process.env.MONGO_INITDB_ROOT_USERNAME,
    password: process.env.MONGO_INITDB_ROOT_PASSWORD,
    database: process.env.MONGO_DATABASE,
  }),
);

const AuthConfig = registerAs(
  ConfigKey.Auth, () => ({
    jwtSecret: process.env.JWT_SECRET,
    jwtExpires: process.env.JWT_EXPIRES,
    jwtCookieName: process.env.JWT_COOKIE_NAME,
  }),
);

export const configurations = [AppConfig, DbConfig, AuthConfig];
