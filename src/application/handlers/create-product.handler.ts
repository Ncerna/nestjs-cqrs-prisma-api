import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject,NotFoundException ,Logger  } from '@nestjs/common';
import { Product } from '../../domain/entities/product.entity';
import { CreateProductCommand } from '../commands/create-product.command';
import { Price } from '../../domain/value-objects/price.vo';
import { Stock } from '../../domain/value-objects/stock.vo';
import { ProductDtoMapper } from '../../application/mappers/product.dto.mapper';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand>
{
    private readonly logger = new Logger(CreateProductHandler.name);
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private readonly productRepo,
    @Inject('CATEGORY_REPOSITORY')
    private readonly categoryRepo,
  ) { }

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
     this.logger.log('Creating product...',product);
    const result = await this.productRepo.create(product);
    return ProductDtoMapper.toDto(result);
  }
}