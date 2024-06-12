import { Injectable } from '@nestjs/common';
import { UsersDto } from './users.dto';
import { hashSync as bcryptHashSync } from 'bcrypt'

@Injectable()
export class UsersService {

    private usersArray: UsersDto[] = []

    create(newUser: UsersDto) {
        newUser.password = bcryptHashSync(newUser.password, 10)
        this.usersArray.push(newUser)
    }

    findByEmail(email: string): UsersDto | null {
        return this.usersArray.find(u => u.email === email)
    }

}
