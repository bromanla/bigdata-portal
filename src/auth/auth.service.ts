import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Users, UsersRole } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Tokens } from './entities/tokens.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Tokens)
    private readonly tokensRepository: Repository<Tokens>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<Users> {
    const [user] = await this.usersService.findOneByEmail(email);
    if (!user) throw new UnauthorizedException('wrong login or password');

    const isHashCorrect = await bcrypt.compare(password, user.password);
    if (!isHashCorrect)
      throw new UnauthorizedException('wrong login or password');

    return user;
  }

  async issueTokens(id: number, username: string, role: UsersRole) {
    const refresh = uuidv4();
    const hashedRefresh = await bcrypt.hash(refresh, 10);
    const payload = { id, username, role };

    const tokens = this.tokensRepository.create({
      userId: id,
      refresh: hashedRefresh,
    });

    await this.tokensRepository.save(tokens);

    return {
      access: this.jwtService.sign(payload),
      refresh,
    };
  }
}
