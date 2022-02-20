import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskType } from './task-type.entity';

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

  @ManyToOne(() => TaskType, (taskType) => taskType.tasks)
  type: Promise<TaskType>;

  @ManyToOne(() => User, (user) => user.tasks)
  user: Promise<User>;
}
