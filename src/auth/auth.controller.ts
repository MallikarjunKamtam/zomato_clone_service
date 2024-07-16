import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(
    @Body() body: { username: string; password: string; email: string },
  ) {
    return this.authService.signUp(body.username, body.password, body.email);
  }

  @Post('signin')
  async signIn(@Body() body: { username: string; password: string }) {
    return this.authService.signIn(body.username, body.password);
  }

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
    const accessToken = request.headers.authorization.split(' ')[1];
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
