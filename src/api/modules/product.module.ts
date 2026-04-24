import { Module } from '@nestjs/common';
import { ProductInfrastructureModule } from '../../infrastructure/modules/product-infrastructure.module';
import { ProductApplicationModule } from '../../application/features/product/product.application.module';
import { ProductController } from '../controllers/product.controller';


@Module({
  imports: [
    ProductInfrastructureModule,
    ProductApplicationModule,
  ],
  controllers: [ProductController],
})
export class ProductModule {}