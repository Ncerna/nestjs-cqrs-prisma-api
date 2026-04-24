import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { UpdateProductCommand } from '../commands/update-product.command';
import { Product } from '../../domain/entities/product.entity';

import { Price } from '../../domain/value-objects/price.vo';
import { Stock } from '../../domain/value-objects/stock.vo';
import { ProductDtoMapper } from '../../application/mappers/product.dto.mapper';

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler
  implements ICommandHandler<UpdateProductCommand>
{
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private readonly productRepo,

    @Inject('CATEGORY_REPOSITORY')
    private readonly categoryRepo,
  ) {}

  async execute(cmd: UpdateProductCommand) {
    const { id, name, price, stock, categoryId } = cmd.payload;
    
    if (!id)  throw new Error('Product ID is required for update');
    const existing = await this.productRepo.findById(id);
  
    if (!existing) {
      throw new NotFoundException('Product not found');
    }
  
    if (categoryId !== undefined) {
      const category = await this.categoryRepo.findById(categoryId);
      if (!category) {
        throw new NotFoundException('Category not found');
      }
    }
  
    const updatedProduct = new Product(
      existing.id,
      name ?? existing.name,
      price !== undefined ? new Price(price) : existing.price,
      stock !== undefined ? new Stock(stock) : existing.stock,
      categoryId ?? existing.categoryId,
      
    );
     const result = await this.productRepo.update(existing.id,updatedProduct);
    return ProductDtoMapper.toDto(result);
  }
}