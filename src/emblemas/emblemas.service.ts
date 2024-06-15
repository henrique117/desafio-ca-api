import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmblemasEntity } from 'src/db/entities/emblemas.entity';
import { Repository } from 'typeorm';
import { UsersEntity } from 'src/db/entities/users.entity';
import EmblemasObject from './emblemasObject';
import { UserEmblemaEntity } from 'src/db/entities/user-emblemas.entity';

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

    async create(userId: number) {

        const randomEmblema = Math.floor(Math.random() * 10) + 1
        const emblemaSelected = EmblemasObject.emblemas[randomEmblema]

        const user = await this.usersRepository.findOneBy({ userid: userId })
        let emblema = await this.emblemasRepository.findOne({ where: { emblemaid: emblemaSelected.id } })

        if(!user) throw new NotFoundException()
        if(!emblema) {
            emblema = new EmblemasEntity()
            emblema.emblemaid = emblemaSelected.id
            emblema.slug = emblemaSelected.slug
            emblema.name = emblemaSelected.name
            emblema.image = emblemaSelected.image
            emblema.users = []
            await this.emblemasRepository.save(emblema)
        }

        const userEmblemaSave = new UserEmblemaEntity()
        userEmblemaSave.user = user
        userEmblemaSave.emblema = emblema

        await this.userEmblemaRepository.save(userEmblemaSave)

        return userEmblemaSave
    }

    async findEmblemasByUserId(userId: number): Promise<UserEmblemaEntity[]> {
        return await this.userEmblemaRepository.find({ where: { user: { userid: userId } }, relations: ['emblema']})
    }
}