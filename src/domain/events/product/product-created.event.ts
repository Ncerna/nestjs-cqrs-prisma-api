export class ProductCreatedEvent {
  constructor(
    public readonly productId: number,
    public readonly name: string,
  ) {}
}