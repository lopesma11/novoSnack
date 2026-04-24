import { randomUUID } from "crypto";
import { Item } from "../../../domain/entities/Item";
import { Price } from "../../../domain/value-objects/Price";
import { IItemRepository } from "../../repositories/IItemRepository";

export interface CreateItemDTO {
  itemName: string;
  itemDescription: string;
  itemPrice: number;
  itemIngredients: string[];
  itemCategory: string;
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
    );

    await this.itemRepository.save(item);
    return item;
  }
}
