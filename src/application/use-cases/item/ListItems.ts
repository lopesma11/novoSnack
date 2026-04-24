import { Item } from "../../../domain/entities/Item";
import { IItemRepository } from "../../repositories/IItemRepository";

export class ListItemsUseCase {
  constructor(private readonly itemRepository: IItemRepository) {}

  async execute(): Promise<Item[]> {
    const items = await this.itemRepository.findAll();
    return items;
  }
}
