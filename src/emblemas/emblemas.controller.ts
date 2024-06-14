import { Controller, Post, Get, Query, UseGuards } from '@nestjs/common';
import { EmblemasDto, ParamsDto } from './emblemas.dto';
import { EmblemasService } from './emblemas.service';
import { AuthGuard } from 'src/auth/auth.guard';
import EmblemasObject from './emblemasObject';

@UseGuards(AuthGuard)
@Controller('emblemas')
export class EmblemasController {

    constructor(private readonly emblemasService: EmblemasService) {}

    @Post('createAll')
    async create() {
        for(let i = 0; i < 10; i++) await this.emblemasService.create(EmblemasObject.emblemas[i])
    }

    @Get()
    async findAll(@Query() params: ParamsDto): Promise<EmblemasDto[]> {
        return await this.emblemasService.findAll(params)
    }
}
