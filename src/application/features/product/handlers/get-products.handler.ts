import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetProductsQuery } from '../queries/get-products.query';
import { PaginatedResponse } from '../../../shared/paginated.response';
import { ProductDto } from '../../../dto/product/product.dto';
import { ProductDtoMapper } from '../../../mappers/product/product.dto.mapper';
import type { IProductRepository } from '../../../interfaces/product/product.repository.interface';


@QueryHandler(GetProductsQuery)
export class GetProductsHandler
  implements IQueryHandler<GetProductsQuery>
{
  
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private readonly productRepo :IProductRepository,
  ) {}

  async execute(query: GetProductsQuery) {
  const { page = 1, size = 10, search = '' } = query.payload;
  const result = await this.productRepo.list({ page, size, search });
  const data: ProductDto[] = result.data.map(ProductDtoMapper.toDto);
  const response = new PaginatedResponse(data, page, size, result.total);

  return response;
}
}