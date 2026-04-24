import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { HttpExceptionFilter } from './api/interceptors/exception.interceptor';
import { ResponseInterceptor } from './api/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,//Elimina automáticamente propiedades que NO están en el DTO
    }),
  );
  app.setGlobalPrefix('api');
  await app.enableVersioning({ type: VersioningType.URI ,defaultVersion: process.env.API_VERSION || '1'});
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);

}
bootstrap();
