import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthDto {
  @ApiProperty({ example: 'kingsley.etoka@innovatespace.co' })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ example: 'kingsley' })
  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  @ApiProperty({ example: 'Etoka' })
  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  @ApiProperty({ example: '12345678' })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
