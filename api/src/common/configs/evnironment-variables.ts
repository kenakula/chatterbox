import { IsDefined, IsEnum, IsNumberString, IsString, MinLength } from 'class-validator';

import { Environment } from './enums';

export class EnvironmentVariables {
  // APP
  @IsDefined()
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsDefined()
  @IsNumberString()
  @MinLength(1)
  APP_PORT: string;

  @IsDefined()
  @IsString()
  @MinLength(1)
  APP_NAME: string;

  // DB
  @IsDefined()
  @IsString()
  @MinLength(1)
  MONGO_HOST: string;

  @IsDefined()
  @IsString()
  @MinLength(1)
  MONGO_PORT: string;

  @IsDefined()
  @IsString()
  @MinLength(1)
  MONGO_INITDB_ROOT_USERNAME: string;

  @IsDefined()
  @IsString()
  @MinLength(1)
  MONGO_INITDB_ROOT_PASSWORD: string;

  @IsDefined()
  @IsString()
  @MinLength(1)
  MONGO_DATABASE: string;
}
