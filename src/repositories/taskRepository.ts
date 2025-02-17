import { injectable } from "tsyringe";
import { AppDataSource } from "../config/database";
import { Task } from "../entities/Task";
import { Repository } from "typeorm";

@injectable()
export class TaskRepository {
  private repository: Repository<Task>;

  constructor() {
    this.repository = AppDataSource.getRepository(Task);
  }

  async create(task: Task): Promise<Task> {
    return await this.repository.save(task);
  }

  async findAll(): Promise<Task[]> {
    return await this.repository.find();
  }

  async findById(id: number): Promise<Task | null> {
    return await this.repository.findOne({ where: { id } });
  }

  async findByTitle(title: string): Promise<Task | null>{
    return await this.repository.findOne({ where: { title } });
  }

  async update(id: number, taskData: Partial<Task>): Promise<Task | null> {
    const result = await this.repository.update(id, taskData);
    if (result.affected === 0) {
      return null;
    }
    return await this.repository.findOne({ where: { id } });
  }
  
  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
