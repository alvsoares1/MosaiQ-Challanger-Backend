import { injectable, inject } from "tsyringe";
import { TaskRepository } from "../repositories/taskRepository";
import { Task } from "../entities/Task";
import { CreateTaskDto } from "../dtos/createTaskDto";
import { UpdateTaskDto } from "../dtos/updateTaskDto";
import { NotFoundError, ConflictError } from "../errors/customErrors";

@injectable()
export class TaskService {
  constructor(
    @inject(TaskRepository) private taskRepository: TaskRepository
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const existingTask = await this.taskRepository.findByTitle(title);
    if (existingTask) {
      throw new ConflictError("Conflito em títulos! Uma tarefa com este título já existe.");
    }

    const task = new Task(title, description);
    return await this.taskRepository.create(task);
  }

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.findAll();
  }

  async findById(id: number): Promise<Task> {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new NotFoundError("Tarefa não encontrada");
    }
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const existingTask = await this.taskRepository.findById(id);
    if (!existingTask) {
      throw new NotFoundError("Tarefa não encontrada");
    }
  
    const updatedTask = await this.taskRepository.update(id, updateTaskDto);
    if (!updatedTask) {
      throw new NotFoundError("Erro ao atualizar: Tarefa não encontrada");
    }
  
    return updatedTask;
  }

  async delete(id: number): Promise<void> {
    const existingTask = await this.taskRepository.findById(id);
    if (!existingTask) {
      throw new NotFoundError("Tarefa não encontrada");
    }

    await this.taskRepository.delete(id);
  }
}
