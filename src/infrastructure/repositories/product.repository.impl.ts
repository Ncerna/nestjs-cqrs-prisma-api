import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Product } from '../../domain/entities/product.entity';
import { ProductMapper } from '../mappers/product.mapper';
 import { ProductPrismaFilter } from '../filters/product.prisma-filter';

@Injectable()
export class ProductRepositoryImpl {
  constructor(private prisma: PrismaService) {}

 
 async create(product: Product): Promise<any> {
  return await this.prisma.product.create({
    data: ProductMapper.toPersistence(product),
  });
}
//CONSULTA PROYECTADA
 async findAll(): Promise<any[]> {
  const data = await this.prisma.product.findMany({
    select: {  id: true,  name: true,  price: true, stock: true,categoryId: true, },
  });
  return data.map(ProductMapper.toDomain);
}
  
  //CONSULTA EXPLÍCITA
  async findById(id: number): Promise<any | null> {
    const data = await this.prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });
    if (!data) return null;
    return data;
  }

  async update(id: number, product: Product): Promise<any> {
    const updated = await this.prisma.product.update({
      where: { id },
      data: ProductMapper.toPersistence(product),
    });
    return updated;
  }

  async delete(id: number): Promise<void> {
    await this.prisma.product.delete({
      where: { id },
    });
  }
 

async list({ page, size, search }) {
  const skip = (page - 1) * size;
  const where = ProductPrismaFilter.build(search,);
  const [data, total] = await this.prisma.$transaction([

    this.prisma.product.findMany({ skip, take: size,  where}),
    this.prisma.product.count({ where, }),

  ]);

  return { data, total };
}
}
