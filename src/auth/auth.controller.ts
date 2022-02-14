import {
  Get,
  Body,
  Post,
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Request,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
// import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

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

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signIn(@Request() req) {
    return req.user;
  }

  // @Post('signin')
  // async signIn(@Body() signInDto: SignInDto) {
  //   const { email, password } = signInDto;

  //   return await this.authService.signIn(email, password);
  // }

  @Post('refresh')
  refresh() {
    return 'refresh';
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
