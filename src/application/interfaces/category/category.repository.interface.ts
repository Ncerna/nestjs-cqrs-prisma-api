import { Category } from '../../../domain/entities/category.entity';

export interface ICategoryRepository {
  findById(id: number): Promise<Category | null>;
}