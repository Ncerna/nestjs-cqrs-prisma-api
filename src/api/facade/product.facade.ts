import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateProductDto } from '../../application/dto/create-product.dto';
import { GetProductsDto } from '../../application/dto/get-products.dto';
import { UpdateProductDto } from '../../application/dto/update-product.dto';

import { CreateProductCommand } from '../../application/commands/create-product.command';
import { UpdateProductCommand } from '../../application/commands/update-product.command';
import { GetProductsQuery } from '../../application/queries/get-products.query';
import { GetProductByIdQuery } from '../../application/queries/get-product-by-id.query';
import { DeleteProductCommand } from '../../application/commands/delete-product.command';


@Injectable()
export class ProductFacade {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  create(dto: CreateProductDto) {
    return this.commandBus.execute( new CreateProductCommand(dto) );
  }
 
  findAll(dto: GetProductsDto) {
    return this.queryBus.execute( new GetProductsQuery(dto),);
  }

  findById(id: number) {
    return this.queryBus.execute( new GetProductByIdQuery(id) );
  }
  update(id: number, dto: UpdateProductDto) {
    return this.commandBus.execute( new UpdateProductCommand({ id, ...dto }),
    );
  }
  
  delete(id: number) {
    return this.commandBus.execute( new DeleteProductCommand({ id }));
  }
}