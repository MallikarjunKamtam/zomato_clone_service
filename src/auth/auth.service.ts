// auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { CognitoService } from './cognito/cognito.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly cognitoService: CognitoService,
  ) {}

  async signUp(username: string, password: string) {
    return this.cognitoService.signUp(username, password);
  }

  async signIn(username: string, password: string) {
    const response = await this.cognitoService.signIn(username, password);
    const tokens = response.AuthenticationResult;
    return {
      accessToken: tokens.AccessToken,
      refreshToken: tokens.RefreshToken,
      idToken: tokens.IdToken,
    };
  }

  async validateToken(token: string) {
    return this.jwtService.verifyAsync(token);
  }
}
