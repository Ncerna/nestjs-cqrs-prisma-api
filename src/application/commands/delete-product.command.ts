export class DeleteProductCommand {
  constructor(public readonly payload: {
    id: number;
  }) {}
}