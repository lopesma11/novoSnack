import type { IUserRepository } from "../../../../application/repositories/IUserRepository.js";
import { User } from "../../../../domain/entities/User.js";
import { UserModel } from "../models/UserModel.js";

export class MongoUserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const doc = await UserModel.findOne({ email });
    if (!doc) return null;

    return User.restore(
      doc._id.toString(),
      doc.userName,
      doc.email,
      doc.password,
      doc.createdAt,
    );
  }
}
