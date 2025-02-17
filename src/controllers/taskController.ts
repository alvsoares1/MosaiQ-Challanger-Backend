import { inject, injectable } from "tsyringe";
import { Request, Response } from "express";
import { TaskService } from "../services/taskService";
import { CreateTaskDto } from "../dtos/createTaskDto";
import { UpdateTaskDto } from "../dtos/updateTaskDto";
import { NotFoundError, ConflictError, ValidationError } from "../errors/customErrors";

@injectable()
export class TaskController {
  constructor(
    @inject(TaskService) private taskService: TaskService
  ) {}

  async create(req: Request, res: Response) {
    try {
      const createTaskDto: CreateTaskDto = req.body;
      const task = await this.taskService.create(createTaskDto);
      return res.status(201).json(task);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const tasks = await this.taskService.findAll();
      return res.status(200).json(tasks);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const task = await this.taskService.findById(Number(req.params.id));
      return res.status(200).json(task);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const updateTaskDto: UpdateTaskDto = req.body;
      const task = await this.taskService.update(Number(req.params.id), updateTaskDto);
      return res.status(200).json(task);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await this.taskService.delete(Number(req.params.id));
      return res.status(204).send(); 
    } catch (error) {
      this.handleError(res, error);
    }
  }

  private handleError(res: Response, error: unknown) {
    if (error instanceof NotFoundError) {
      return res.status(404).json({ message: error.message });
    }
  
    if (error instanceof ConflictError) {
      return res.status(409).json({ message: error.message });
    }
  
    if (error instanceof ValidationError) {
      return res.status(422).json({ message: error.message });
    }
  
    return res.status(500).json({ message: "Erro interno do servidor", error: error instanceof Error ? error.message : "Erro desconhecido" });
  }
}
