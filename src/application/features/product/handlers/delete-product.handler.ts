import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException, Logger } from '@nestjs/common';
import { DeleteProductCommand } from '../commands/delete-product.command';
import type { ILogger } from '../../../interfaces/logger/logger.port';

import type { IProductRepository } from '../../../interfaces/product/product.repository.interface';


@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler
  implements ICommandHandler<DeleteProductCommand> {
 
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private readonly productRepo:IProductRepository,
    @Inject('LOGGER')
    private readonly logger: ILogger,
  ) { }

  async execute(cmd: DeleteProductCommand) {
    const { id } = cmd.payload;
    this.logger.log(' product delete : ', id);
    const product = await this.productRepo.findById(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }
     this.logger.warn(`Delete failed - product not found: ${id}`);
    return this.productRepo.delete(id);
  }
}