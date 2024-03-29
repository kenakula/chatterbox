import { Module } from '@nestjs/common';
import { ConfigsModule } from '@common/configs';
import { DatabaseModule } from '@common/database';
import { LoggerModule } from '@common/logger';

import { AuthModule } from '@modules/auth';
import { RoomsModule } from '@modules/rooms';
import { UsersModule } from '@modules/users';

@Module({
  imports: [ConfigsModule, DatabaseModule, LoggerModule, UsersModule, RoomsModule, AuthModule],
})
export class AppModule {
}
