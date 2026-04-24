import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './api/modules/product.module';
import { LoggerModule } from './infrastructure/logging/logger.module';


@Module({
  imports: [ProductModule,LoggerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
