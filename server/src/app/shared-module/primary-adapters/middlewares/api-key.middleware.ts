import {
  ForbiddenException,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { appConfig } from '../../../config/app.config';

export class ApiKeyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const receivedApiKey = req.headers[appConfig.apiKeyHeader];

    if (!receivedApiKey) {
      throw new UnauthorizedException(
        `${appConfig.apiKeyHeader} header is required!`,
      );
    }

    if (receivedApiKey !== appConfig.apiKey) {
      throw new ForbiddenException('Bad API key!');
    }

    next();
  }
}
