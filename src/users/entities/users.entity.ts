import { Exclude } from 'class-transformer';
import { Tokens } from 'src/auth/entities/tokens.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum UsersRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: false })
  isActivated: boolean;

  @Column({
    type: 'enum',
    enum: UsersRole,
    default: UsersRole.USER,
  })
  role: UsersRole;

  @OneToMany(() => Tokens, (token) => token.user)
  tokens: Promise<Tokens[]>;
}
