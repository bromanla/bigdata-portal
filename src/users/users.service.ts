import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async create(username: string, email: string) {
    // TODO: uncomment
    // await this.isUniqueUser(username, email);

    const password = Math.random().toString(36).slice(-8);
    const hash = await bcrypt.hash(password, 10);

    // TODO: select role
    const user = this.usersRepository.create({
      username,
      email,
      password: hash,
      isActivated: false,
    });

    // TODO: send password to mail
    // TODO: mapped and convert users entity
    return this.usersRepository.save(user);
  }

  async isUniqueUser(username: string, email: string) {
    const users = await this.usersRepository.find({
      where: [{ username }, { email }],
    });

    if (users.length)
      throw new BadRequestException(['username or email already in use']);
  }
}
