import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { Response } from 'express';
import { GenerateUuidHelper } from '../../application/utils/generate-uuid.helper';

@Catch()
export class ErrorHandlerMiddleware implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const id = GenerateUuidHelper.generate;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: any;
    const detail = exception?.detail;

    if (exception instanceof QueryFailedError) {
      status = HttpStatus.UNPROCESSABLE_ENTITY;
      message = detail || exception.message;
    } else if (!(exception instanceof InternalServerErrorException)) {
      const res = exception?.getResponse() as any;
      status = res?.statusCode;
      message = res?.message;
    }

    response.status(status).send({ code: status, message, errorId: id });
  }
}
