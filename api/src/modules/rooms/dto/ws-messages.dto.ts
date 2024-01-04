import { MessageModel } from '@domain/models';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

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
