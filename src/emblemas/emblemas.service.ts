import { Injectable } from '@nestjs/common';
import { EmblemasDto, ParamsDto } from './emblemas.dto';

@Injectable()
export class EmblemasService {

    private emblemasArray: EmblemasDto[] = []

    create(emblemas: EmblemasDto) {
        this.emblemasArray.push(emblemas)
    }

    findAll(params: ParamsDto): EmblemasDto[] {
        return this.emblemasArray.filter(e => {
            let match = true

            if(params.slug != undefined && !e.slug.includes(params.slug)) match = false
            if(params.name != undefined && !e.name.includes(params.name)) match = false

            return match
        })
    }
}
