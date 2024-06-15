import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthResponseDto } from './auth.dto';
import { compareSync as bcryptCompareSync } from 'bcrypt'
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    private jwtExpirationTime: number
    constructor (
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {
        this.jwtExpirationTime = +this.configService.get<number>('JWT_EXPIRATION_TIME')
    }

    async signIn(email: string, password: string): Promise<AuthResponseDto> {
        const foundUser = await this.usersService.findByEmail(email)

        if(!foundUser || !bcryptCompareSync(password, foundUser.password)) throw new UnauthorizedException()

        const payload = { sub: foundUser.userid, username: foundUser.username }
        const token = this.jwtService.sign(payload)

        return { token, expiresIn: this.jwtExpirationTime }
    }
}
