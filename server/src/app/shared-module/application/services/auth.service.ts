import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Tokens } from '../interfaces/tokens.interface';
import { TokenPayload } from '../interfaces/token-payload.interface';
import { authConfig } from '../../../config/auth.config';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';

export class AuthService {
  static async isPasswordCorrect(
    password: string,
    userPassword: string,
  ): Promise<boolean> {
    return this.comparePassword(password, userPassword);
  }

  static hashPass(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, authConfig.saltRounds, (err, hash) => {
        if (err) {
          throw new BadRequestException();
        }
        resolve(hash);
      });
    });
  }

  static isTokenValid(token: string): TokenPayload | undefined {
    return jwt.verify(token, authConfig.accessSecret, (err, decoded) => {
      if (err) {
        return undefined;
      }
      return decoded;
    });
  }

  static comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    try {
      return new Promise((resolve, reject) => {
        bcrypt.compare(password, hashedPassword, (err, result) => {
          if (err) {
            reject(err.message);
          } else {
            resolve(result);
          }
        });
      });
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  static isRefreshTokenValid(token: string): TokenPayload {
    return jwt.verify(token, authConfig.refreshSecret, (err, decoded) => {
      if (err) {
        throw new UnauthorizedException();
      }
      return decoded;
    });
  }

  static generateTokens({
    email,
    domain,
    userType,
    userId,
    permission,
  }: TokenPayload): Tokens {
    return {
      accessToken: this.generateAccessToken({
        email,
        domain,
        userType,
        userId,
        permission,
      }),
      refreshToken: this.generateRefreshToken({
        email,
        domain,
        userType,
        userId,
        permission,
      }),
    };
  }

  static generateRefreshToken({
    email,
    domain,
    userType,
    userId,
    permission,
  }: TokenPayload): string {
    return jwt.sign(
      { email, domain, userType, userId, permission },
      authConfig.refreshSecret,
      { expiresIn: `${authConfig.refreshExpirationHours}h` },
    );
  }

  static generateAccessToken({
    email,
    domain,
    userType,
    userId,
    permission,
  }: TokenPayload): string {
    return jwt.sign(
      { email, domain, userType, userId, permission },
      authConfig.accessSecret,
      { expiresIn: `${authConfig.accessExpirationHours}h` },
    );
  }
}
