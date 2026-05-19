import { IUserRepository } from "../../../../application/repositories/IUserRepository";
import { User } from "../../../../domain/entities/user";
import { UserModel } from "../models/UserModel";

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
