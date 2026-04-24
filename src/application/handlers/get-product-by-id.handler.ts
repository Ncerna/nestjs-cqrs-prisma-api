import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { GetProductByIdQuery } from '../queries/get-product-by-id.query';
import { ProductDtoMapper } from '../../application/mappers/product.dto.mapper';

@QueryHandler(GetProductByIdQuery)
export class GetProductByIdHandler
  implements IQueryHandler<GetProductByIdQuery> {

  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private readonly productRepo,
  ) { }

  async execute(query: GetProductByIdQuery) {
  
    if (!query.id) throw new Error('Product ID is required for get');
    const product = await this.productRepo.findById(query.id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return ProductDtoMapper.toDto(product);
  }
}