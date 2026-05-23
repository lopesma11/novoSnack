import type { IItemRepository } from "../../../../application/repositories/IItemRepository.js";
import { Item } from "../../../../domain/entities/Item.js";
import { Price } from "../../../../domain/value-objects/Price.js";
import { ItemModel } from "../models/ItemModel.js";

export class MongoItemRepository implements IItemRepository {
  async save(item: Item): Promise<Item> {
    await ItemModel.create({
      _id: item.itemId,
      itemName: item.itemName,
      itemDescription: item.itemDescription,
      itemPrice: item.itemPrice.getValue(),
      itemIngredients: item.itemIngredients,
      itemCategory: item.itemCategory,
      imagePath: item.imagePath,
      createdAt: item.createdAt,
    });

    return item;
  }

  async findAll(): Promise<any[]> {
    const docs = await ItemModel.find().lean();

    return docs.map((doc: any) => ({
      _id: doc._id,
      name: doc.itemName,
      description: doc.itemDescription,
      imagePath: doc.imagePath ?? "",
      price: doc.itemPrice,
      category: doc.itemCategory,
      ingredients: (doc.itemIngredients ?? []).map((ing: any) => ({
        _id: ing._id,
        name: ing.name,
        icon: ing.icon,
      })),
    }));
  }

  private toEntity(doc: any): Item {
    return new Item(
      doc._id,
      doc.itemName,
      doc.itemDescription,
      new Price(doc.itemPrice),
      doc.itemIngredients,
      doc.itemCategory,
    );
  }
}
