import { User } from "../../domain/entities/user";

export interface IUserRepository {
  findByEmail(username: string): Promise<User | null>;
}
