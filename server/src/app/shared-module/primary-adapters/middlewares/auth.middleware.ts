import { NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../../application/services/auth.service';

export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      throw new UnauthorizedException('Authorization header is required');
    }

    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Authorization token is required');
    }

    const decodedToken = AuthService.isTokenValid(token);

    if (decodedToken) {
      req.app.locals.authUser = decodedToken;
      next();
    }
  }
}
