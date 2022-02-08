import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    // Fix: move to user controller
    await this.authService.isUniqueUser(signUpDto);

    // TODO: create user method

    return signUpDto;
  }

  @Post('refresh')
  refresh() {
    return 'refresh';
  }

  @Post('signin')
  signIn() {
    return 'reg';
  }

  @Post('reset')
  resetPassword() {
    return 'reset';
  }
}
