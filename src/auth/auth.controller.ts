import { Body, Post, HttpCode, UseGuards, Controller } from '@nestjs/common';
import { RequestUser } from 'src/common/decorators/user-request.decorator';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { Token } from './entities/token.entity';
import { JwtRefreshGuard } from './guards/jwt-refresh-auth.guard';
import { LocalGuard } from './guards/local-auth.guard';

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
  @UseGuards(LocalGuard)
  @Post('signin')
  async signIn(@RequestUser() user: User) {
    return await this.authService.issueTokens(
      user.id,
      user.username,
      user.role,
    );
  }

  @HttpCode(200)
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async refresh(@RequestUser() token: Token) {
    const user = await token.user;

    await this.authService.removeRefreshTokenById(token.id);
    return await this.authService.issueTokens(
      user.id,
      user.username,
      user.role,
    );
  }
}
