import { Request, Response } from "express";
import { CreateCategoryUseCase } from "../../../application/use-cases/category/createCategory";

export class CategoryController {
  constructor(private readonly createCategory: CreateCategoryUseCase) {}

  async handle(request: Request, response: Response): Promise<void> {
    try {
      const { categoryName } = request.body;

      await this.createCategory.execute({ categoryName });

      return response
        .status(201)
        .json({ message: "Category created successfully" });
    } catch (error) {
      return response.status(500).json({ message: "Internal server error" });
    }
  }
}
