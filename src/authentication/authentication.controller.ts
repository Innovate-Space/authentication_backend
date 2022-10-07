import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { AuthenticationService } from './authentication.service';
import { Public } from './decorators';
import { AuthDto, CreateAuthDto } from './dto';
import { AuthResponse } from './types';

@ApiTags('authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  //@Public()
  @ApiOkResponse({ type: AuthResponse })
  @Post('sign-up')
  createAccount(@Body() dto: CreateAuthDto): Promise<AuthResponse> {
    return this.authService.createAccount(dto);
  }

  @Public()
  @ApiOkResponse({ type: AuthResponse })
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: AuthDto): Promise<AuthResponse> {
    return this.authService.login(dto);
  }

  @Public()
  @ApiOkResponse({ type: AuthResponse })
  @Get('all')
  getAllUsers(): Promise<User[]> {
    return this.authService.getAll();
  }
}
