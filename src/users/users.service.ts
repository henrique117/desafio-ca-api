import { ConflictException, Injectable } from '@nestjs/common';
import { UsersDto } from './users.dto';
import { hashSync as bcryptHashSync } from 'bcrypt'
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/db/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UsersEntity)
        private readonly usersRepository: Repository<UsersEntity>
    ) {}

     async create(newUser: UsersDto) {
        const emailAlreadyRegistered = await this.findByEmail(newUser.email)
        const usernameAlreadyRegistered = await this.findByUsername(newUser.username)

        if(emailAlreadyRegistered) throw new ConflictException(`Email já cadastrado`)
        if(usernameAlreadyRegistered) throw new ConflictException(`Usuário '${newUser.username}' já cadastrado`)

        const dbUser = new UsersEntity()
        dbUser.username = newUser.username
        dbUser.email = newUser.email
        dbUser.password = bcryptHashSync(newUser.password, 10)

        const { id, username, email, pfp } = await this.usersRepository.save(dbUser)

        return { id, username, email, pfp }
    }

    async findByEmail(email: string): Promise<UsersDto | null> {
        const userFound = await this.usersRepository.findOne({
            where: { email }
        })

        if(!userFound) return null

        return {
            id: userFound.id,
            email: userFound.email,
            password: userFound.password,
            username: userFound.username,
            pfp: userFound.pfp
        }
    }

    async findByUsername(username: string): Promise<UsersDto | null> {
        const userFound = await this.usersRepository.findOne({
            where: { username }
        })

        if(!userFound) return null

        return {
            id: userFound.id,
            email: userFound.email,
            password: userFound.password,
            username: userFound.email,
            pfp: userFound.pfp
        }
    }

}
