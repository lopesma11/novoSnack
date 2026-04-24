import { Item } from "../../domain/entities/Item";

export interface IItemRepository {
  save(item: Item): Promise<Item>;
  findAll(): Promise<Item[]>;
}
