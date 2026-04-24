import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject,NotFoundException  } from '@nestjs/common';
import { Product } from '../../../../domain/entities/product.entity';
import { CreateProductCommand } from '../commands/create-product.command';
import { Price } from '../../../../domain/value-objects/price.vo';
import { Stock } from '../../../../domain/value-objects/stock.vo';
import { ProductDtoMapper } from '../../../mappers/product/product.dto.mapper';
import type { IProductRepository } from '../../../interfaces/product/product.repository.interface';
import type { ICategoryRepository } from '../../../interfaces/category/category.repository.interface';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand>
{
    
 constructor(
  @Inject('PRODUCT_REPOSITORY')
  private readonly productRepo: IProductRepository,
  @Inject('CATEGORY_REPOSITORY')
  private readonly categoryRepo: ICategoryRepository,
) {}

   async execute(cmd: CreateProductCommand) {
    const { name, price, stock, categoryId } = cmd.payload;
    const category = await this.categoryRepo.findById(categoryId);
    if (!category) 
      throw new NotFoundException('Category not found');
    
    const product = new Product( null, name,
      new Price(price),
      new Stock(stock),
      categoryId,
    );
    const result = await this.productRepo.create(product);
    return ProductDtoMapper.toDto(result);
  }
}