import {
  Get,
  Body,
  Post,
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post('signup')
  @UseInterceptors(ClassSerializerInterceptor)
  async signUp(@Body() signUpDto: SignUpDto) {
    const { username, email } = signUpDto;

    return await this.userService.create(username, email);
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

  @Get('activate')
  activate() {
    return 'ok';
  }
}
