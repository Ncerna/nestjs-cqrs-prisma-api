import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
@Injectable()
export class CategoryRepositoryImpl {
  constructor(private prisma: PrismaService) {}

  async findById(id: number) {
    return this.prisma.category.findUnique({
      where: { id },
    });
  }
}


