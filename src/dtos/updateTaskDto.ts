import { TaskStatus } from '../entities/TaskStatus';

export class UpdateTaskDto {
  title?: string;
  description?: string;
  status?: TaskStatus;
}
