import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async isUniqueUser(signUpDto: SignUpDto) {
    const usersByUsername = await this.usersRepository.find({
      where: { username: signUpDto.username },
    });

    const usersByEmail = await this.usersRepository.find({
      where: { email: signUpDto.email },
    });

    if (!usersByUsername.length || !usersByEmail.length)
      throw new BadRequestException(['username or email already in use']);
  }
}
