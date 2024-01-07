import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HashingService } from '@common/helpers';

import { UsersMigration } from '@modules/users/users.migration';

import { User, UserSchema } from './entities';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, HashingService, UsersMigration],
  exports: [UsersService],
})
export class UsersModule implements OnModuleInit {
  constructor(private readonly migrationService: UsersMigration) {}

  async onModuleInit(): Promise<void> {
    await this.migrationService.createAdminUser();
  }
}
