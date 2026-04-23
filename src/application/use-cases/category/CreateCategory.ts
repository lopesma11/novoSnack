import { MongoCategoryRepository } from "../../../infrastructure/database/mongoose/repositories/MongoCategoryRepository";

export class CreateCategoryUseCase {
  constructor(
    private readonly createCategoryRepository: MongoCategoryRepository,
  ) {}

  async execute(data: { categoryName: string }): Promise<void> {}
}
