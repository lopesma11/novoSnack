import { ICategoryRepository } from "../../../../application/repositories/ICategoryRepository";

export class MongoCategoryRepository implements ICategoryRepository {
  async save();

  async findAll(): Promise<Category[]> {}
}
