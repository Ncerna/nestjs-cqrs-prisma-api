import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaService } from '../../../prisma/prisma.service';
// API
import { ProductController } from '../../api/controllers/product.controller';
// HANDLERS
import { CreateProductHandler } from '../../application/handlers/create-product.handler';
import { UpdateProductHandler } from '../../application/handlers/update-product.handler';
import { DeleteProductHandler } from '../../application/handlers/delete-product.handler';
import { GetProductsHandler } from '../../application/handlers/get-products.handler';
import { GetProductByIdHandler } from '../../application/handlers/get-product-by-id.handler';
// INFRASTRUCTURE
import { ProductRepositoryImpl } from '../repositories/product.repository.impl';
import { CategoryRepositoryImpl } from '../repositories/category.repository.impl';

const CommandHandlers = [CreateProductHandler,UpdateProductHandler,DeleteProductHandler];
const QueryHandlers = [GetProductsHandler,GetProductByIdHandler];


@Module({
  imports: [CqrsModule],
  controllers: [ProductController],
  providers: [PrismaService,
    ...CommandHandlers,
    ...QueryHandlers,

    {
      provide: 'PRODUCT_REPOSITORY',
      useClass: ProductRepositoryImpl,
    },
    {
      provide: 'CATEGORY_REPOSITORY',
      useClass: CategoryRepositoryImpl,
    },
  ],
  exports: [],
})
export class ProductModule {}