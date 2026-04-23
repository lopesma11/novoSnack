import { Category } from "../../domain/entities/category";

export interface ICategoryRepository {
  save(category: Category): Promise<Category>;
  findAll(): Promise<Category[]>;
}
