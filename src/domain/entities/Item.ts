import { Price } from "../value-objects/Price.js";

export class Item {
  readonly itemId: string;
  readonly itemName: string;
  readonly itemDescription: string;
  readonly itemPrice: Price;
  readonly itemIngredients: string[];
  readonly itemCategory: string;
  readonly createdAt: Date;

  constructor(
    itemId: string,
    itemName: string,
    itemDescription: string,
    itemPrice: Price,
    itemIngredients: string[],
    itemCategory: string,
  ) {
    this.itemId = itemId;
    this.itemName = itemName;
    this.itemDescription = itemDescription;
    this.itemPrice = itemPrice;
    this.itemIngredients = itemIngredients;
    this.itemCategory = itemCategory;
    this.createdAt = new Date();
  }

  getItemName(): string {
    return this.itemName;
  }

  getItemDescription(): string {
    return this.itemDescription;
  }

  getItemIngredients(): string[] {
    return this.itemIngredients;
  }

  getItemCategory(): string {
    return this.itemCategory;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }
}
