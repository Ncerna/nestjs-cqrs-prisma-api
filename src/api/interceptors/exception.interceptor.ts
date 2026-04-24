import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch() // captura TODO tipo de error
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: any = 'Internal server error';

    // ✔ errores conocidos de Nest
    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();

      const res = exception.getResponse();

      // puede venir string o objeto
      if (typeof res === 'string') {
        message = res;
      } else if (typeof res === 'object') {
        const r: any = res;
        message = r.message || r.error || message;
      }
    }

    // ✔ errores inesperados (ej: Prisma, JS)
    else if (exception instanceof Error) {
      message = exception.message;
    }

    // respuesta uniforme conosido como wappers .net
    response.status(statusCode).json({
      status: false,
      data: null,
      message,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}