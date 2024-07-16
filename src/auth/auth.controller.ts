import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
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
}
