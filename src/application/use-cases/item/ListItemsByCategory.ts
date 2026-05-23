import type { IItemRepository } from "../../repositories/IItemRepository.js";

export interface ListItemsByCategoryDTO {
  categoryId: string;
}

export class ListItemsByCategoryUseCase {
  constructor(private readonly itemRepository: IItemRepository) {}

  async execute(data: ListItemsByCategoryDTO): Promise<any[]> {
    return this.itemRepository.findByCategory(data.categoryId);
  }
}
