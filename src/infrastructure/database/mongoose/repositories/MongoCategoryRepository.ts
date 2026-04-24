import { ICategoryRepository } from "../../../../application/repositories/ICategoryRepository";
import { Category } from "../../../../domain/entities/category";
import { CategoryModel } from "../models/CategoryModel";

export class MongoCategoryRepository implements ICategoryRepository {
  async save(category: Category): Promise<Category> {
    await CategoryModel.create({
      _id: category.categoryId,
      categoryName: category.getCategoryName(),
      createdAt: category.getCreatedAt(),
    });

    return category;
  }

  async findAll(): Promise<Category[]> {
    const docs = await CategoryModel.find().lean();

    return docs.map((doc) => this.toEntity(doc));
  }

  private toEntity(doc: any): Category {
    return new Category(doc._id, doc.categoryName);
  }
}
