import { UsersRole } from 'src/users/entities/users.entity';

export class JwtPayload {
  userId: number;

  username: string;

  role: UsersRole;
}
