import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { AuthTokenPayload } from 'src/user/user.interface';

@Injectable()
export class GraphQLAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const gqlContext = GqlExecutionContext.create(context);
    const { req } = gqlContext.getContext();
    const token = this.extractJwtTokenFromRequest(req);

    if (!token) {
        throw new UnauthorizedException('Missing or invalid Authorization header');
    }

    try {       
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY) as AuthTokenPayload // Verify JWT token    
        req.user = decodedToken; // Set decoded token as user in request object
        return true;
    } catch (error) {
        throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private extractJwtTokenFromRequest(request: any): string | null {
    const authorizationHeader = request.headers['authorization'];
    if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
      return authorizationHeader.substring(7); // Remove 'Bearer ' prefix
    }
    return null;
  }
}