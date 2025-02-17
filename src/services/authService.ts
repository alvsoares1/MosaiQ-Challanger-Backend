import { injectable, inject } from "tsyringe";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/userRepository";
import { RegisterUserDto } from "../dtos/registerUserDto";
import { LoginUserDto } from "../dtos/loginUserDto";
import { User } from "../entities/User";
import { ConflictError, NotFoundError, UnauthorizedError } from "../errors/customErrors";

@injectable()
export class AuthService {
  constructor(
    @inject(UserRepository) private userRepository: UserRepository
  ) {}

  async createUser(registerUserDto: RegisterUserDto): Promise<User> {
    const { email, password, name } = registerUserDto;

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new ConflictError("Usuário já existe");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User(name, email, hashedPassword); 

    return await this.userRepository.save(newUser);
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<string> {
    const { email, password } = loginUserDto;

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundError("Usuário não encontrado");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError("Senha incorreta");
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      "your-secret-key", 
      { expiresIn: "1h" } 
    );

    return token;
  }
}
