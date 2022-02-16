import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users, UsersRole } from './entities/users.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async create(username: string, email: string, role = UsersRole.USER) {
    await this.isUniqueUser(username, email);

    const password = Math.random().toString(36).slice(-8);
    const hash = await bcrypt.hash(password, 10);

    const user = this.usersRepository.create({
      username,
      email,
      role,
      password: hash,
      isActivated: false,
    });

    // TODO: send password to mail
    console.log(password);

    return this.usersRepository.save(user);
  }

  async findOneByEmail(email: string) {
    return this.usersRepository.find({ where: { email } });
  }

  async findOneByUsername(username: string) {
    return this.usersRepository.find({ where: { username } });
  }

  async findOneById(id: number) {
    return this.usersRepository.findByIds([id]);
  }

  async isUniqueUser(username: string, email: string) {
    const users = await this.usersRepository.find({
      where: [{ username }, { email }],
    });

    if (users.length)
      throw new BadRequestException(['username or email already in use']);
  }
}
