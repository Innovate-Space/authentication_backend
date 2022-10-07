import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { AccessJwtStrategy, RefreshJwtStrategy } from './strategy';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthenticationController],
  providers: [AccessJwtStrategy, RefreshJwtStrategy, AuthenticationService],
})
export class AuthenticationModule {}
