export class Quantity {
  private readonly value: number;

  constructor(value: number) {
    if (!Number.isInteger(value) || value <= 0) {
      throw new Error(`Quantidade deve ser um número inteiro positivo.`);
    }

    this.value = value;
  }

  getValue(): number {
    return this.value;
  }

  equals(other: Quantity): boolean {
    return this.value === other.getValue();
  }
}
