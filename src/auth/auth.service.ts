import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async signIn(email: string, password: string) {
    const [user] = await this.usersRepository.find({ where: { email } });

    if (!user) throw new BadRequestException('wrong login or password');

    const isHashCorrect = await bcrypt.compare(password, user.password);

    if (!isHashCorrect)
      throw new BadRequestException('wrong login or password');
  }
}
