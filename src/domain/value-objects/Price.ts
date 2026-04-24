export class Price {
  private readonly value: number;

  constructor(value: number) {
    if (typeof value !== "number" || value <= 0) {
      throw new Error(`O preço deve ser um número inteiro positivo.`);
    }

    this.value = value;
  }

  getValue(): number {
    return this.value;
  }

  equals(other: Price): boolean {
    return this.value === other.getValue();
  }
}
