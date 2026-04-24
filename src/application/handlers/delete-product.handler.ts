import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { DeleteProductCommand } from '../commands/delete-product.command';

@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler
  implements ICommandHandler<DeleteProductCommand>
{
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private readonly productRepo,
  ) {}

  async execute(cmd: DeleteProductCommand) {
    const { id } = cmd.payload;

    const product = await this.productRepo.findById(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.productRepo.delete(id);
  }
}