import { randomUUID } from "crypto";
import { Category } from "../../../domain/entities/Category.js";
import type { ICategoryRepository } from "../../repositories/ICategoryRepository.js";

export interface CreateCategoryDTO {
  categoryName: string;
}

export class CreateCategoryUseCase {
  constructor(private readonly createCategoryRepository: ICategoryRepository) {}

  async execute(data: CreateCategoryDTO): Promise<Category> {
    const category = new Category(randomUUID(), data.categoryName);

    await this.createCategoryRepository.save(category);

    return category;
  }
}
