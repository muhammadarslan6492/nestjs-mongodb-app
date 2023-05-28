import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { VerifyOptions } from 'jsonwebtoken';
import { decodeToken } from '../utils/index';

@Injectable()
export class AuthGuard implements CanActivate {
  //   constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return false;
    }
    const options: VerifyOptions = VerifyOptions;
    const user = await decodeToken(token, options);
    return user;
  }
}
