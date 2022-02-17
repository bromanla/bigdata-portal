import { Body, Post, HttpCode, UseGuards, Controller } from '@nestjs/common';
import { RequestUser } from 'src/common/decorators/user-request.decorator';
import { Users } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    const { username, email } = signUpDto;

    return await this.userService.create(username, email);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signIn(@RequestUser() user: Users) {
    const tokens = await this.authService.issueTokens(
      user.id,
      user.username,
      user.role,
    );

    return tokens;
  }
}
