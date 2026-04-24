import {
  Controller, Post, Get, Body, Param, Put, Delete, Query,
} from '@nestjs/common';

import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateProductDto } from '../../application/dto/create-product.dto';
import { GetProductsDto } from '../../application/dto/get-products.dto';
import { UpdateProductDto } from '../../application/dto/update-product.dto';

import { CreateProductCommand } from '../../application/commands/create-product.command';
import { UpdateProductCommand } from '../../application/commands/update-product.command';
import { GetProductsQuery } from '../../application/queries/get-products.query';
import { GetProductByIdQuery } from '../../application/queries/get-product-by-id.query';
import { DeleteProductCommand } from '../../application/commands/delete-product.command';



@Controller({ path: 'products', version: '1',})
export class ProductController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Post()
  create(@Body() dto: CreateProductDto) {
     return this.commandBus.execute(new CreateProductCommand(dto));
  }
    @Get()
  findAll( @Query() dto: GetProductsDto ) {
    return this.queryBus.execute(  new GetProductsQuery(dto));
  }
  
   @Get(':id')
  findById(@Param('id') id: number) {
    return this.queryBus.execute(new GetProductByIdQuery(Number(id)) );
  }


  @Put(':id')
  update(  @Param('id') id: number,  @Body() dto: UpdateProductDto) {
    return this.commandBus.execute(
      new UpdateProductCommand({  id: Number(id),...dto}),
    );
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.commandBus.execute( new DeleteProductCommand({id:Number(id)}));
  }

}