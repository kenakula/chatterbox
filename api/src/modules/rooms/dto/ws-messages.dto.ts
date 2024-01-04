import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

import { MessageModel } from '@app/core/models';

export class WsJoinRoomDto {
  @IsNotEmpty()
  @IsString()
  roomId: string;

  @IsNotEmpty()
  @IsString()
  user: string;
}

export class WsChatMessageDto {
  @IsNotEmpty()
  @IsString()
  roomId: string;

  @IsNotEmpty()
  @ValidateNested()
  message: MessageModel;
}
