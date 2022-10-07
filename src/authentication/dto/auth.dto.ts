import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @ApiProperty({ example: 'kingsley.etoka@innovatespace.co' })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ example: 'Aa12345@' })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
