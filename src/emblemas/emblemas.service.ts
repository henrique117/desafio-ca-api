import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmblemasEntity } from 'src/db/entities/emblemas.entity';
import { Repository } from 'typeorm';
import { UsersEntity } from 'src/db/entities/users.entity';
import EmblemasObject from './emblemasObject';
import { UserEmblemaEntity } from 'src/db/entities/user-emblemas.entity';
import { EmblemasDto } from './emblemas.dto';
import { CustomRequest } from 'src/auth/custom.interface';

@Injectable()
export class EmblemasService {

    constructor(
        @InjectRepository(EmblemasEntity)
        private readonly emblemasRepository: Repository<EmblemasEntity>,
        @InjectRepository(UsersEntity)
        private readonly usersRepository: Repository<UsersEntity>,
        @InjectRepository(UserEmblemaEntity)
        private readonly userEmblemaRepository: Repository<UserEmblemaEntity>,
    ) {}

    async create(placeEmblemas: EmblemasDto[]) {
        try {
            for(let i = 0; i < 10; i++) {
                let emblemaSave = placeEmblemas[i]
                await this.emblemasRepository.save(emblemaSave)
            }
        } catch(e) {
            throw new Error(e)
        }
    }

    async associate(req: CustomRequest) {
        const userID: number = req.user?.userid
        const emblemaID: number = Math.floor(Math.random() * 9.99) + 1
        const userInventory = await this.findEmblemasByUserId(userID)
        let userAlreadyHave = false

        userInventory.forEach(e => {
            if(e.emblema.emblemaid == emblemaID) userAlreadyHave = true
        })

        console.log(userID, emblemaID, userAlreadyHave)

        if(!userID) throw new UnauthorizedException()
        if(userAlreadyHave) throw new HttpException('Você tirou um emblema repetido!', HttpStatus.OK)

        const userDB = await this.usersRepository.findOne({ where: { userid: userID } })
        const emblemaDB = await this.emblemasRepository.findOne({ where: { emblemaid: emblemaID } })

        console.log(userDB, emblemaDB)

        try {
            const userEmblemaSave = new UserEmblemaEntity()
            userEmblemaSave.user = userDB
            userEmblemaSave.emblema = emblemaDB

            return await this.userEmblemaRepository.save(userEmblemaSave)
        } catch(e) {
            throw new Error(e)
        }
    }

    async findEmblemasByUserId(userId: number): Promise<UserEmblemaEntity[]> {
        return await this.userEmblemaRepository.find({ where: { user: { userid: userId } }, relations: ['emblema']})
    }
}