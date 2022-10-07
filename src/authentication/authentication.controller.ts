import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticationService } from './authentication.service';
import { Public } from './decorators';
import { AuthDto, CreateAuthDto } from './dto';
import { AuthResponse } from './types';

@ApiTags('authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Public()
  @Post('sign-up')
  createAccount(@Body() dto: CreateAuthDto): Promise<AuthResponse> {
    return this.authService.createAccount(dto);
  }

  @Public()
  @Post('sign-in')
  login(@Body() dto: AuthDto): Promise<AuthResponse> {
    return this.authService.login(dto);
  }
}
