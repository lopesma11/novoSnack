import { randomUUID } from "crypto";
import { Item } from "../../../domain/entities/Item.js";
import { Price } from "../../../domain/value-objects/Price.js";
import type { IItemRepository } from "../../repositories/IItemRepository.js";

export interface CreateItemDTO {
  itemName: string;
  itemDescription: string;
  itemPrice: number;
  itemIngredients: { name: string; icon: string }[];
  itemCategory: string;
  imagePath?: string;
}

export class CreateItemUseCase {
  constructor(private readonly itemRepository: IItemRepository) {}

  async execute(data: CreateItemDTO): Promise<Item> {
    const item = new Item(
      randomUUID(),
      data.itemName,
      data.itemDescription,
      new Price(data.itemPrice),
      data.itemIngredients,
      data.itemCategory,
      data.imagePath ?? "",
    );

    await this.itemRepository.save(item);
    return item;
  }
}
