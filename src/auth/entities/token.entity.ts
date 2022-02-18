import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  refresh: string;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.tokens)
  user: Promise<User>;

  @Column()
  mark: string;

  @Column({ default: 'NOW()' })
  created: Date;
}
