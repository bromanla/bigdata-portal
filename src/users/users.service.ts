import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(username: string, email: string, role = UserRole.USER) {
    await this.isUniqueUser(username, email);

    const password = Math.random().toString(36).slice(-8);
    const hash = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      username,
      email,
      role,
      password: hash,
      isActivated: false,
    });

    // TODO: send password to mail
    console.log(password);

    return this.userRepository.save(user);
  }

  async findOneByEmail(email: string) {
    return this.userRepository.find({ where: { email } });
  }

  async findOneByUsername(username: string) {
    return this.userRepository.find({ where: { username } });
  }

  async findOneById(id: number) {
    return this.userRepository.findByIds([id]);
  }

  async isUniqueUser(username: string, email: string) {
    const users = await this.userRepository.find({
      where: [{ username }, { email }],
    });

    if (users.length)
      throw new BadRequestException(['username or email already in use']);
  }
}
