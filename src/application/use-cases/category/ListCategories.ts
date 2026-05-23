import { Category } from "../../../domain/entities/Category.js";
import type { ICategoryRepository } from "../../repositories/ICategoryRepository.js";

export class ListCategoriesUseCase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoryRepository.findAll();
    return categories;
  }
}
