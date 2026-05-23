export class Category {
  readonly categoryId: string;
  readonly name: string;
  readonly icon: string;
  readonly createdAt: Date;

  constructor(categoryId: string, name: string, icon: string = "") {
    this.categoryId = categoryId;
    this.name = name;
    this.icon = icon;
    this.createdAt = new Date();
  }

  getCategoryName(): string {
    return this.name;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }
}
