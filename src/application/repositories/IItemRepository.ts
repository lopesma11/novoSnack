export interface IItemRepository {
  save(item: Item): Promise<void>;
  findAll(): Promise<Item[]>;
}
