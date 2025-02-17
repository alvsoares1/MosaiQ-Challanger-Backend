import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { TaskStatus } from './TaskStatus';  

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,  
    default: TaskStatus.PENDING,
  })
  status: TaskStatus;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
    this.status = TaskStatus.PENDING;
    this.createdAt = new Date();
  }
}

