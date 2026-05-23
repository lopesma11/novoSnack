import type { Request, Response, NextFunction } from "express";
import { CreateItemUseCase } from "../../../application/use-cases/item/CreateItem.js";
import { ListItemsUseCase } from "../../../application/use-cases/item/ListItems.js";

export class ItemController {
  constructor(
    private readonly createItemUseCase: CreateItemUseCase,
    private readonly listItemsUseCase: ListItemsUseCase,
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
      } = request.body;

      await this.createItemUseCase.execute({
        itemName,
        itemDescription,
        itemPrice,
        itemIngredients,
        itemCategory,
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
}
