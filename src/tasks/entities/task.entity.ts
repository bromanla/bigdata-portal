import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum TaskTypes {
  'сбор коментариев',
  'анализ тональности',
  'облако ключевых слов – ассоциации с компанией',
  'сбор целевой аудитории и её географические данные',
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  company: string;

  @Column()
  comment?: string;

  @Column({ default: false })
  completed: boolean;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.tasks)
  user: Promise<User>;
}
