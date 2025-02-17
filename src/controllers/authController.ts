import { inject, injectable } from "tsyringe";
import { Request, Response } from "express";
import { AuthService } from "../services/authService";
import { RegisterUserDto } from "../dtos/registerUserDto";
import { LoginUserDto } from "../dtos/loginUserDto";
import { NotFoundError, ConflictError, UnauthorizedError, ValidationError } from "../errors/customErrors";

@injectable()
export class AuthController {
  constructor(
    @inject(AuthService) private authService: AuthService
  ) {}

  async register(req: Request, res: Response) {
    try {
      const registerUserDto: RegisterUserDto = req.body;
      const user = await this.authService.createUser(registerUserDto);
      return res.status(201).json({ message: "Usuário criado com sucesso", user });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const loginUserDto: LoginUserDto = req.body;
      const token = await this.authService.loginUser(loginUserDto);
      return res.status(200).json({ message: "Login bem-sucedido", token });
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

    if (error instanceof UnauthorizedError) {
      return res.status(401).json({ message: error.message });
    }

    if (error instanceof ValidationError) {
      return res.status(422).json({ message: error.message });
    }

    return res.status(500).json({ message: "Erro interno do servidor", error: error instanceof Error ? error.message : "Erro desconhecido" });
  }
}
