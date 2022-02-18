import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User, UserRole } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './entities/token.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signIn(email: string, password: string): Promise<User> {
    const [user] = await this.usersService.findOneByEmail(email);
    if (!user) throw new UnauthorizedException('wrong login or password');

    const isHashCorrect = await bcrypt.compare(password, user.password);
    if (!isHashCorrect)
      throw new UnauthorizedException('wrong login or password');

    return user;
  }

  async issueTokens(userId: number, username: string, role: UserRole) {
    const refreshPayload = { userId, mark: uuidv4() };
    const accessPayload = { userId, username, role };

    const refreshToken = this.jwtService.sign(refreshPayload, {
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRES'),
    });

    const accessToken = this.jwtService.sign(accessPayload);

    // hash and add the refresh token to the repository
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    const newToken = this.tokenRepository.create({
      userId,
      refresh: hashedRefreshToken,
      mark: refreshPayload.mark,
    });

    await this.tokenRepository.save(newToken);

    return {
      access: accessToken,
      refresh: refreshToken,
    };
  }

  async removeRefreshTokenById(id: number) {
    return this.tokenRepository.delete(id);
  }

  async compareRefreshTokens(
    userId: number,
    mark: string,
    refreshToken: string,
  ) {
    const [token] = await this.tokenRepository.find({
      where: { userId, mark },
    });
    if (!token) throw new UnauthorizedException('token is not valid');

    const isHashCorrect = await bcrypt.compare(refreshToken, token.refresh);
    if (!isHashCorrect) throw new UnauthorizedException('token is not valid');

    return token;
  }
}
