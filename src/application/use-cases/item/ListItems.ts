import { Item } from "../../../domain/entities/Item.js";
import type { IItemRepository } from "../../repositories/IItemRepository.js";

export class ListItemsUseCase {
  constructor(private readonly itemRepository: IItemRepository) {}

  async execute(): Promise<Item[]> {
    const items = await this.itemRepository.findAll();
    return items;
  }
}
