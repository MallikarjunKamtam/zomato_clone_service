import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as jwksClient from 'jwks-rsa';
import * as dotenv from 'dotenv';
dotenv.config();
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private client: jwksClient.JwksClient;

  constructor(private reflector: Reflector) {
    this.client = jwksClient({
      jwksUri: `https://cognito-idp.${process.env.COGNITO_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}/.well-known/jwks.json`,
    });
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = request.cookies['accessToken'];

    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    try {
      const decodedToken = await this.verifyToken(token);
      request.user = decodedToken;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private verifyToken(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const { header } = jwt.decode(token, { complete: true });
      if (!header) {
        return reject(new Error('Invalid token'));
      }

      this.client.getSigningKey(header.kid, (err, key) => {
        if (err) {
          return reject(err);
        }

        const signingKey = key.getPublicKey();
        jwt.verify(
          token,
          signingKey,
          { algorithms: ['RS256'] },
          (err, decoded) => {
            if (err) {
              return reject(err);
            }
            resolve(decoded);
          },
        );
      });
    });
  }
}
