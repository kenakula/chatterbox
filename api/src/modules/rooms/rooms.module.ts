import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Room, RoomSchema } from './entities';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { RoomsRepository } from './rooms-repository.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }])],
  controllers: [RoomsController],
  providers: [RoomsService, RoomsRepository],
})
export class RoomsModule {
}
