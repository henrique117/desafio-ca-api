import { ConflictException, Injectable } from '@nestjs/common';
import { EmblemasDto, ParamsDto } from './emblemas.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EmblemasEntity } from 'src/db/entities/emblemas.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';

@Injectable()
export class EmblemasService {

    constructor(
        @InjectRepository(EmblemasEntity)
        private readonly emblemasRepository: Repository<EmblemasEntity>
    ) {}

    private emblemasArray: EmblemasDto[] = []

    async create(emblemas: EmblemasDto) {

        if(await this.findById(emblemas.id)) throw new ConflictException('Os emblemas já foram registrados no banco de dados')

        const emblemasSave: EmblemasEntity = {
            id: emblemas.id,
            slug: emblemas.slug,
            name: emblemas.name,
            image: emblemas.image
        }

        const createdEmblema = await this.emblemasRepository.save(emblemasSave)

        return this.mapEntityToDto(createdEmblema)
    }

    async findAll(params: ParamsDto): Promise<EmblemasDto[]> {
        const searchParams: FindOptionsWhere<EmblemasEntity> = {}

        if(params.slug) searchParams.slug = Like(`%${params.slug}%`)
        if(params.name) searchParams.name = Like(`%${params.name}%`)

        const emblemasFound = await this.emblemasRepository.find({ where: searchParams })

        return emblemasFound.map(emblemasEntity => this.mapEntityToDto(emblemasEntity))
    }

    private mapEntityToDto(emblemasEntity: EmblemasEntity): EmblemasDto {
        return {
            id: emblemasEntity.id,
            slug: emblemasEntity.slug,
            name: emblemasEntity.name,
            image: emblemasEntity.image
        }
    }

    private async findById(id: number): Promise<Boolean> {
        const foundEmblema = await this.emblemasRepository.findOne({ where: { id } })
        if(!foundEmblema) return false
        return true
    }
}
