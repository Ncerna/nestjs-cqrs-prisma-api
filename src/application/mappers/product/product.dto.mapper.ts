
import { ProductDto } from '../dto/product.dto';
export class ProductDtoMapper {
  static toDto(data : any): ProductDto {
    return {
      id: data.id!,
      name: data.name,
      price: data.price,
      stock: data.stock,
      categoryId: data.categoryId,
    };
  }
  
}