import { IItemRepository } from "../../../../application/repositories/IItemRepository";
import { Item } from "../../../../domain/entities/Item";
import { Price } from "../../../../domain/value-objects/Price";
import { ItemModel } from "../models/ItemModel";

export class MongoItemRepository implements IItemRepository {
  async save(item: Item): Promise<Item> {
    await ItemModel.create({
      _id: item.itemId,
      itemName: item.itemName,
      itemDescription: item.itemDescription,
      itemPrice: item.itemPrice.getValue(),
      itemIngredients: item.itemIngredients,
      itemCategory: item.itemCategory,
      createdAt: item.createdAt,
    });

    return item;
  }

  async findAll(): Promise<Item[]> {
    const docs = await ItemModel.find().lean();

    return docs.map((doc) => this.toEntity(doc));
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
