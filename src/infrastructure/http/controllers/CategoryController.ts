import type { Request, Response, NextFunction } from "express";
import { CreateCategoryUseCase } from "../../../application/use-cases/category/CreateCategory.js";
import { ListCategoriesUseCase } from "../../../application/use-cases/category/ListCategories.js";

export class CategoryController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly listCategoriesUseCase: ListCategoriesUseCase,
  ) {}

  async handleCreate(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { categoryName } = request.body;

      await this.createCategoryUseCase.execute({ categoryName });

      return response
        .status(201)
        .json({ message: "Category created successfully" });
    } catch (error) {
      next(error);
    }
  }

  async handleList(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const categories = await this.listCategoriesUseCase.execute();
      return response.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  }
}
