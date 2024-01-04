import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SaveMessageDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  messageId: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  text: string;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  timestamp: number;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  sentBy: string;
}
