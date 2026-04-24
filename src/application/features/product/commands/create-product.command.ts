export class CreateProductCommand {
  constructor(public readonly payload: {
    name: string;
    price: number;
    stock: number;
    categoryId: number;
  }) {}
}