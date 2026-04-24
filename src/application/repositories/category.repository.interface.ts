import { Category } from '../../domain/entities/category.entity';

export interface CategoryRepository {
  findById(id: string): Promise<Category | null>;
}