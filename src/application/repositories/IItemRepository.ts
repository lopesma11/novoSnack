import { Item } from "../../domain/entities/Item.js";

export interface IItemRepository {
  save(item: Item): Promise<Item>;
  findAll(): Promise<Item[]>;
  findByCategory(categoryId: string): Promise<any[]>;
}
