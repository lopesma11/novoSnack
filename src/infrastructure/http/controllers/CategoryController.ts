import { Request, Response } from "express";
import { CreateCategoryUseCase } from "../../../application/use-cases/category/createCategory";
import { ListCategoriesUseCase } from "../../../application/use-cases/category/ListCategories";

export class CategoryController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly listCategoriesUseCase: ListCategoriesUseCase,
  ) {}

  async handleCreate(request: Request, response: Response): Promise<void> {
    try {
      const { categoryName } = request.body;

      await this.createCategoryUseCase.execute({ categoryName });

      return response
        .status(201)
        .json({ message: "Category created successfully" });
    } catch (error) {
      return response.status(500).json({ message: "Internal server error" });
    }
  }

  async handleList(request: Request, response: Response): Promise<void> {
    try {
      const categories = await this.listCategoriesUseCase.execute();
      return response.status(201).json(categories);
    } catch (error) {
      return response.status(500).json({ message: "Internal server error" });
    }
  }
}
