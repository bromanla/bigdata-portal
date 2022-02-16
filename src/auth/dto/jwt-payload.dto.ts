import { UsersRole } from 'src/users/entities/users.entity';

export class JwtPayload {
  id: number;

  username: string;

  role: UsersRole;
}
