import {
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { appConfig } from '../../../config/app.config';
import { AuthService } from '../../application/services/auth.service';

export class ApiKeyOrTokenAuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    let isApiTokenValid = true;
    let isTokenValid = true;

    const receivedApiKey = req.headers[appConfig.apiKeyHeader];

    if (!receivedApiKey) {
      isApiTokenValid = false;
    }

    if (receivedApiKey !== appConfig.apiKey) {
      isApiTokenValid = false;
    }

    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      isTokenValid = false;
    }

    const token = authorizationHeader ? authorizationHeader.split(' ')[1] : undefined;

    if (!token) {
      isTokenValid = false;
    }

    const decodedToken = AuthService.isTokenValid(token);

    if (decodedToken) {
      req.app.locals.authUser = decodedToken;
    } else {
      isTokenValid = false;
    }

    if (isApiTokenValid || isTokenValid) {
      next();
    } else {
      throw new UnauthorizedException();
    }
  }
}
