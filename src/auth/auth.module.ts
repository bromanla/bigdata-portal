import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  providers: [AuthService, UsersService, LocalStrategy],
  controllers: [AuthController],
  imports: [PassportModule, TypeOrmModule.forFeature([Users])],
  exports: [],
})
export class AuthModule {}
