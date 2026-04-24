import { Request, Response } from "express";
import { CreateItemUseCase } from "../../../application/use-cases/item/createItem";
import { ListItemsUseCase } from "../../../application/use-cases/item/listItems";

export class ItemController {
  constructor(
    private readonly createItemUseCase: CreateItemUseCase,
    private readonly listItemsUseCase: ListItemsUseCase,
  ) {}

  async handleCreate(request: Request, response: Response): Promise<void> {
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
      return response.status(500).json({ message: "Internal server error" });
    }
  }

  async handleList(request: Request, response: Response): Promise<void> {
    try {
      const items = await this.listItemsUseCase.execute();

      return response.status(200).json(items);
    } catch (error) {
      return response.status(500).json({ message: "Internal server error" });
    }
  }
}
