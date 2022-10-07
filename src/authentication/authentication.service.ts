import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Role, User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon2 from 'argon2';

import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, CreateAuthDto } from './dto';
import { AuthResponse } from './types';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  async getAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async login(dto: AuthDto): Promise<AuthResponse> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) throw new ForbiddenException('Invalid email/password');
    const doesMatch = this.verifyHash(dto.password, user.password);
    if (!doesMatch) throw new ForbiddenException('Invalid email/password');
    const userTokens = await this.getTokens(user.id, user.email, user.role);
    return {
      message: 'Login success',
      tokens: { ...userTokens },
      user: {
        firstName: user.firstName,
        email: user.email,
      },
    };
  }

  async createAccount(dto: CreateAuthDto): Promise<AuthResponse> {
    try {
      const hashedPassword = await this.createHash(dto.password);
      const user = await this.prisma.user.create({
        data: {
          firstName: dto.firstName,
          lastName: dto.lastName,
          email: dto.email,
          password: hashedPassword,
        },
      });
      const userTokens = await this.getTokens(user.id, user.email, user.role);
      return {
        message: 'Account created',
        tokens: { ...userTokens },
        user: {
          firstName: user.firstName,
          email: user.email,
        },
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
        throw error;
      } else {
        throw error;
      }
    }
  }

  private async getTokens(userId: number, email: string, role: Role) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email: email,
          role: role,
        },
        {
          expiresIn: 60 * 15, // 15mins
          secret: this.config.get('ACCESS_TOKEN_SECRET'),
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email: email,
          role: role,
        },
        {
          expiresIn: 60 * 60 * 24 * 7, // 1 week
          secret: this.config.get('REFRESH_TOKEN_SECRET'),
        },
      ),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  private async createHash(data: string): Promise<string> {
    return await argon2.hash(data);
  }

  private async verifyHash(
    rawString: string,
    hashedString: string,
  ): Promise<boolean> {
    return await argon2.verify(hashedString, rawString);
  }
}
