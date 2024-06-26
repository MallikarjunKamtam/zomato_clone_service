// common/filters/typeorm-exception.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { Response } from 'express';

@Catch(QueryFailedError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let message = (exception as any).detail;
    if ((exception as any).code === '23505') { // Unique violation
      message = 'Duplicate value violates unique constraint.';
    } else {
      message = 'Oops! Something went wrong.'
    }

    response
      .status(HttpStatus.BAD_REQUEST)
      .json({
        statusCode: HttpStatus.BAD_REQUEST,
        message,
      });
  }
}
