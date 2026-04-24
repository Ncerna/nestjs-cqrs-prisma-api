import { Category } from '../../../domain/entities/category.entity';

export interface ICategoryRepository {
  findById(id: string): Promise<Category | null>;
}