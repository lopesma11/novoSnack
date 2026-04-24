import { Category } from "../../../domain/entities/category";
import { ICategoryRepository } from "../../repositories/ICategoryRepository";

export class ListCategoriesUseCase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoryRepository.findAll();
    return categories;
  }
}
