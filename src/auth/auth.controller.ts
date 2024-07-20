import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  Req,
  Res,
  Response,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Public } from 'src/common/decorators/public.decorator';
import { Response as ResponseType } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  async signUp(
    @Body() body: { username: string; password: string; email: string },
  ) {
    return this.authService.signUp(body.username, body.password, body.email);
  }

  @Public() @Post('signin') async signIn(
    @Body() body: { username: string; password: string },
    @Response() res: ResponseType,
  ) {
    const tokens = await this.authService.signIn(body.username, body.password);
    res.cookie('accessToken', tokens.AccessToken, {
      httpOnly: true,
      secure: true,
    });
    res.cookie('idToken', tokens.IdToken, { httpOnly: true, secure: true });
    res.cookie('refreshToken', tokens.RefreshToken, {
      httpOnly: true,
      secure: true,
    });
    return res.status(HttpStatus.OK).json({ message: 'Sign in successful' });
  }
  @Public()
  @Post('confirm')
  async confirmSignUp(@Body() body) {
    const { username, confirmationCode } = body;

    try {
      await this.authService.confirmSignUp(username, confirmationCode);
      return { message: 'User confirmed successfully. You can now sign in.' };
    } catch (error) {
      console.error('Error during confirmation:', error);
      throw error;
    }
  }

  @Post('signout')
  async signOut(@Req() request) {
    const accessToken = request.cookies['accessToken'];
    try {
      await this.authService.signOut(accessToken);
      return { message: 'Successfully signed out.' };
    } catch (error) {
      console.error('Error during sign-out:', error);
      throw error;
    }
  }

  @Post('admin/signout')
  async adminSignOut(@Body() body) {
    const { username } = body;
    try {
      await this.authService.adminSignOut(username);
      return { message: 'User successfully signed out.' };
    } catch (error) {
      console.error('Error during admin sign-out:', error);
      throw error;
    }
  }
}
