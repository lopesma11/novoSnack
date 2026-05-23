import type { ICategoryRepository } from "../../../../application/repositories/ICategoryRepository.js";
import { Category } from "../../../../domain/entities/Category.js";
import { CategoryModel } from "../models/CategoryModel.js";

export class MongoCategoryRepository implements ICategoryRepository {
  async save(category: Category): Promise<Category> {
    await CategoryModel.create({
      _id: category.categoryId,
      name: category.name,
      icon: category.icon,
      createdAt: category.getCreatedAt(),
    });

    return category;
  }

  async findAll(): Promise<any[]> {
    const docs = await CategoryModel.find().lean();

    return docs.map((doc: any) => ({
      _id: doc._id,
      name: doc.name,
      icon: doc.icon ?? "",
    }));
  }

  private toEntity(doc: any): Category {
    return new Category(doc._id, doc.categoryName);
  }
}
