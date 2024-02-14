import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtAuthService } from './auth.service';
import { AuthTokenPayload, RequestWithAuth } from 'src/user/user.interface';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtAuthService: JwtAuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request:RequestWithAuth = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers['authorization'];
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid Authorization header');
    }

    const token = authorizationHeader.split(' ')[1];
    try {
      const payload: AuthTokenPayload =await  this.jwtAuthService.verifyToken(token);
      request.user = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}