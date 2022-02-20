import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/users/entities/user.entity';

export const Admin = () => SetMetadata(UserRole.ADMIN, true);
