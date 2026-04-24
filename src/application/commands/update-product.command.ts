export class UpdateProductCommand {
  constructor(public readonly payload: {
    id: number;
    name?: string;
    price?: number;
    stock?: number;
    categoryId?: number;
  }) {}
}