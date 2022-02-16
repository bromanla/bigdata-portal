import { Users } from 'src/users/entities/users.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tokens {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  refresh: string;

  @Column()
  userId: number;

  @ManyToOne(() => Users, (user) => user.tokens)
  user: Promise<Users>;

  @Column({ default: 'NOW()' })
  created: Date;
}
