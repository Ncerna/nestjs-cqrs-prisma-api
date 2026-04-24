export class Stock {
  constructor(private readonly value: number) {
    if (value < 0) {
      throw new Error('Stock cannot be negative');
    }
  }

  getValue() {
    return this.value;
  }
}