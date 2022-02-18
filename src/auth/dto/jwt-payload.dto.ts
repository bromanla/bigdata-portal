import { UserRole } from 'src/users/entities/user.entity';

export class JwtPayload {
  userId: number;

  username: string;

  role: UserRole;
}
