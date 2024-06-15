import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Response } from 'express';
import { CustomRequest } from './custom.interface'

@Injectable()
export class JwtMiddleware implements NestMiddleware {
    constructor(private readonly jwtService: JwtService) {}

    use(req: CustomRequest, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.substring(7);

            try {
                const decoded = this.jwtService.decode(token) as { sub: string };

                if (decoded && decoded.sub) {
                    req.user = { userid: +decoded.sub };
                }
            } catch (error) {
                throw new UnauthorizedException('Token inválido ou expirado');
            }
        }

        next();
    }
}