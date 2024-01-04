import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignupDto {
  @ApiProperty({ example: 'kenakula' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: '123123' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: '123123' })
  @IsString()
  @IsNotEmpty()
  passwordConfirm: string;
}
