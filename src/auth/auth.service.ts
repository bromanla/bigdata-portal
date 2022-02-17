import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Users, UsersRole } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Tokens } from './entities/tokens.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Tokens)
    private readonly tokensRepository: Repository<Tokens>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signIn(email: string, password: string): Promise<Users> {
    const [user] = await this.usersService.findOneByEmail(email);
    if (!user) throw new UnauthorizedException('wrong login or password');

    const isHashCorrect = await bcrypt.compare(password, user.password);
    if (!isHashCorrect)
      throw new UnauthorizedException('wrong login or password');

    return user;
  }

  async issueTokens(userId: number, username: string, role: UsersRole) {
    const refreshPayload = { userId };
    const accessPayload = { userId, username, role };

    const refreshToken = this.jwtService.sign(refreshPayload, {
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRES'),
    });

    const accessToken = this.jwtService.sign(accessPayload);

    // hash and add the refresh token to the repository
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    const newToken = this.tokensRepository.create({
      userId,
      refresh: hashedRefreshToken,
    });

    await this.tokensRepository.save(newToken);

    return {
      access: accessToken,
      refresh: refreshToken,
    };
  }

  async compareRefreshTokens(userId: number, refreshToken: string) {
    const [token] = await this.tokensRepository.find({ userId });
    if (!token) throw new UnauthorizedException('token is not valid');

    const isHashCorrect = await bcrypt.compare(refreshToken, token.refresh);
    if (!isHashCorrect) throw new UnauthorizedException('token is not valid');
  }
}
