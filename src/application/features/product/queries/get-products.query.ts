export class GetProductsQuery {
  constructor(public readonly payload: {
    page?: number;
    size?: number;
    search?: string;
  }) {}
}