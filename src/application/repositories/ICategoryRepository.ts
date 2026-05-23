import { Category } from "../../domain/entities/Category.js";

export interface ICategoryRepository {
  save(category: Category): Promise<Category>;
  findAll(): Promise<Category[]>;
}
