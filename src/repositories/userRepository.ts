import { injectable } from "tsyringe";
import { AppDataSource } from "../config/database";
import { User } from "../entities/User";
import { Repository } from "typeorm";

@injectable()
export class UserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async save(user: User): Promise<User> {
    return await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.repository.findOne({ where: { email } });
  }
}
