import { MessageModel } from '@domain/models';
import { IsNotEmpty, ValidateNested } from 'class-validator';

export class WsJoinRoomDto {
  @IsNotEmpty()
  roomId: string;

  @IsNotEmpty()
  user: string;
}

export class WsChatMessageDto {
  @IsNotEmpty()
  roomId: string;

  @IsNotEmpty()
  @ValidateNested()
  message: MessageModel;
}
