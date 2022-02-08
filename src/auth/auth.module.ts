import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService, UsersService],
  controllers: [AuthController],
  imports: [TypeOrmModule.forFeature([Users])],
  exports: [],
})
export class AuthModule {}
