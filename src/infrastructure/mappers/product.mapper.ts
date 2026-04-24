import { Product } from '../../domain/entities/product.entity';
import { Price } from '../../domain/value-objects/price.vo';
import { Stock } from '../../domain/value-objects/stock.vo';


export class ProductMapper {
  static toDomain(data: any): Product {
    return new Product(
        data.id,
      data.name,
      new Price(data.price),
      new Stock(data.stock),
      data.categoryId,
      
    );
  }

  static toPersistence(product: Product) {
    return {
      name: product.name,
      price: product.price.getValue(),
      stock: product.stock.getValue(),
      categoryId: product.categoryId,
    };
  }
}