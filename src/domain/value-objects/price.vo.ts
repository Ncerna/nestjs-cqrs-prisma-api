export class Price {
  constructor(private readonly value: number) {
    if (value <= 0) {
      throw new Error('Price must be greater than 0');
    }
  }

  getValue() {
    return this.value;
  }
}