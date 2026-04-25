import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ProductInfrastructureModule } from '../../../infrastructure/modules/product-infrastructure.module';
import { LoggerModule } from '../../../infrastructure/logging/logger.module'
// HANDLERS
import { CreateProductHandler } from '../product/handlers/create-product.handler';
import { UpdateProductHandler } from '../product/handlers/update-product.handler';
import { DeleteProductHandler } from '../product/handlers/delete-product.handler';
import { GetProductsHandler } from '../product/handlers/get-products.handler';
import { GetProductByIdHandler } from '../product/handlers/get-product-by-id.handler';

@Module({
  imports: [CqrsModule,ProductInfrastructureModule,LoggerModule],

  providers: [
    CreateProductHandler,
    UpdateProductHandler,
    DeleteProductHandler,
    GetProductsHandler,
    GetProductByIdHandler,
  ],
})
export class ProductApplicationModule {}