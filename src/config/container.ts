import { container } from "tsyringe";
import { TaskRepository } from "../repositories/taskRepository";
import { TaskService } from "../services/taskService";
import { TaskController } from "../controllers/taskController";
import { UserRepository } from "../repositories/userRepository";  
import { AuthService } from "../services/authService";  
import { AuthController } from "../controllers/authController";  


container.registerSingleton(TaskRepository, TaskRepository);
container.registerSingleton(TaskService, TaskService);
container.registerSingleton(TaskController, TaskController);


container.registerSingleton(UserRepository, UserRepository);  
container.registerSingleton(AuthService, AuthService);  
container.registerSingleton(AuthController, AuthController);  
