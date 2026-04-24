import { Module } from '@nestjs/common';

import { PrismaService } from '../../../prisma/prisma.service';

// INFRASTRUCTURE
import { ProductRepositoryImpl } from '../repositories/product.repository.impl';
import { CategoryRepositoryImpl } from '../repositories/category.repository.impl';

@Module({
  providers: [
    PrismaService,
    { provide: 'PRODUCT_REPOSITORY', useClass: ProductRepositoryImpl, },
    {  provide: 'CATEGORY_REPOSITORY', useClass: CategoryRepositoryImpl, },
  ],
  exports: ['PRODUCT_REPOSITORY', 'CATEGORY_REPOSITORY'],
})
export class ProductInfrastructureModule {}