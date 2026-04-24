import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetProductsQuery } from '../queries/get-products.query';
import { PaginatedResponse } from '../../application/shared/paginated.response';
import { ProductDto } from '../dto/product.dto';
import { ProductDtoMapper } from '../../application/mappers/product.dto.mapper';

@QueryHandler(GetProductsQuery)
export class GetProductsHandler
  implements IQueryHandler<GetProductsQuery>
{
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private readonly productRepo,
  ) {}

  async execute(query: GetProductsQuery) {
    const { page = 1, size = 10, search } = query.payload;
    const result = await this.productRepo.list({  page, size, search});
    // PROYECCIÓN A DTO
    const data: ProductDto[] = result.data.map(
      ProductDtoMapper.toDto,
    );
    return new PaginatedResponse(
      data,
      page,
      size,
      result.total,
    );
  }
}