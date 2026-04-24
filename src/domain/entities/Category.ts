export class Category {
  readonly categoryId: string;
  readonly categoryName: string;
  readonly createdAt: Date;

  constructor(categoryId: string, categoryName: string) {
    this.categoryId = categoryId;
    this.categoryName = categoryName;
    this.createdAt = new Date();
  }

  getCategoryName(): string {
    return this.categoryName;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }
}
