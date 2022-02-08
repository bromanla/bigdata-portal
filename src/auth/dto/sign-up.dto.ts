import { IsEmail, IsString, Length } from 'class-validator';

export class SignUpDto {
  @IsString()
  @Length(5, 25)
  username: string;

  @IsEmail()
  email: string;
}
