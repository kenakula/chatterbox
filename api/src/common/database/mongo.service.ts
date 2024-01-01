import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';
import { ConfigKey } from '@common/configs';

@Injectable()
export class MongoService implements MongooseOptionsFactory {
  constructor(private readonly config: ConfigService) {
  }

  createMongooseOptions(): Promise<MongooseModuleOptions> | MongooseModuleOptions {
    const username = this.config.get<string>(`${ConfigKey.Database}.username`);
    const password = this.config.get<string>(`${ConfigKey.Database}.password`);

    const host = this.config.get<string>(`${ConfigKey.Database}.host`);

    const name = this.config.get<string>(`${ConfigKey.Database}.database`);

    const port = this.config.get<string>(`${ConfigKey.Database}.port`);

    const url = `mongodb://${username}:${password}@${host}:${port}/${name}`;

    return {
      uri: url,
      authSource: 'admin',
      authMechanism: 'DEFAULT',
    };
  }

}
