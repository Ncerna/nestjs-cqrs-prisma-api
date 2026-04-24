import { Product } from '../../domain/entities/product.entity';

export interface ProductRepository {
  create(product: Product): Promise<any>;
  findAll(): Promise<any[]>;
  findById(id: number): Promise<any | null>;
  update(id: number, product: Product): Promise<any>;
  delete(id: number): Promise<void>;
  
  list(params: { page: number; size: number; search?: string; }):
   Promise<{ data: any[]; total: number;}>;
}