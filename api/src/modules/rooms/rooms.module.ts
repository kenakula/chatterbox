import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerService } from '@common/logger';

import { RoomGateway } from '@modules/rooms/room.gateway';

import { Room, RoomSchema } from './entities';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Room.name, schema: RoomSchema },
    ]),
  ],
  controllers: [RoomsController],
  providers: [RoomsService, RoomGateway, LoggerService],
})
export class RoomsModule {
}
