import { ApiProperty } from '@nestjs/swagger';
import { Tokens } from './tokens.types';

class User {
  @ApiProperty({ example: 'Kingsley' })
  firstName: string;
  @ApiProperty({ example: 'Kingsley.etoka@innovatespace.co' })
  email: string;
}

export class AuthResponse {
  @ApiProperty({ example: 'Account creation message' })
  message: string;
  @ApiProperty({ type: Tokens })
  tokens: Tokens;
  @ApiProperty({ type: User })
  user: User;
}
