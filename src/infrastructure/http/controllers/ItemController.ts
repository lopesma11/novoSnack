import type { Request, Response, NextFunction } from "express";
import { CreateItemUseCase } from "../../../application/use-cases/item/CreateItem.js";
import { ListItemsUseCase } from "../../../application/use-cases/item/ListItems.js";
import { ListItemsByCategoryUseCase } from "../../../application/use-cases/item/ListItemsByCategory.js";

export class ItemController {
  constructor(
    private readonly createItemUseCase: CreateItemUseCase,
    private readonly listItemsUseCase: ListItemsUseCase,
    private readonly listItemsByCategoryUseCase: ListItemsByCategoryUseCase,
  ) {}

  async handleCreate(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const {
        itemName,
        itemDescription,
        itemPrice,
        itemIngredients,
        itemCategory,
        imagePath,
      } = request.body;

      await this.createItemUseCase.execute({
        itemName,
        itemDescription,
        itemPrice,
        itemIngredients,
        itemCategory,
        imagePath,
      });

      return response
        .status(201)
        .json({ message: "Item created successfully" });
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
      const items = await this.listItemsUseCase.execute();
      return response.status(200).json(items);
    } catch (error) {
      next(error);
    }
  }

  async handleListByCategory(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { categoryId } = request.params;

      const items = await this.listItemsByCategoryUseCase.execute({
        categoryId,
      });
      return response.status(200).json(items);
    } catch (error) {
      next(error);
    }
  }
}
