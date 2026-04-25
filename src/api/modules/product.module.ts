import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ProductApplicationModule } from '../../application/features/product/product.application.module';
import { ProductController } from '../controllers/product.controller';

@Module({
  imports: [
    CqrsModule,
    ProductApplicationModule,
  ],
  controllers: [ProductController],
})
export class ProductModule {}