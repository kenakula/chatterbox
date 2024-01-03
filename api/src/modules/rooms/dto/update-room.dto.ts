import { PartialType } from '@nestjs/swagger';

import { CreateRoomDto } from './create-room.dto';

export class UpdateRoomDto extends PartialType(CreateRoomDto) {
  name: string;

  description: string;

  users: string[];
}