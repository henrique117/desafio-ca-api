import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CustomRequest } from './custom.interface';

@Injectable()
export class AuthGuard implements CanActivate {

  private jwtSecret: string

  constructor (
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {
    this.jwtSecret = this.configService.get<string>('JWT_SECRET')
  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest<CustomRequest>()
    const token = this.extractTokenFromHeader(request)

    if(!token) throw new UnauthorizedException()

    try {
      const payload = await this.jwtService.verifyAsync(token, { secret: this.jwtSecret })
      request.user = { userid: +payload.sub }
    } catch {
      throw new UnauthorizedException()
    }

    return true
  }

  private extractTokenFromHeader(request: CustomRequest): string | undefined {
    const authHeader = request.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7);
    }

    return undefined
  }
}
