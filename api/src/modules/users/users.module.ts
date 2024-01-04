import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HashingService } from '@common/helpers';

import { User, UserSchema } from './entities';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersService, HashingService],
  exports: [UsersService],
})
export class UsersModule {
}
