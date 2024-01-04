import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HashingService, userPresaveFactory } from '@common/helpers';

import { User } from './entities';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: userPresaveFactory,
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, HashingService],
  exports: [UsersService],
})
export class UsersModule {
}
