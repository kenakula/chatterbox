import { Module } from '@nestjs/common';
import { ConfigsModule } from '@common/configs';
import { DatabaseModule } from '@common/database';
import { LoggerModule } from '@common/logger';

import { RoomsModule } from '@modules/rooms';
import { UsersModule } from '@modules/users';
import { MessagesModule } from './modules/messages/messages.module';

@Module({
  imports: [ConfigsModule, DatabaseModule, LoggerModule, UsersModule, RoomsModule, MessagesModule],
})
export class AppModule {
}
