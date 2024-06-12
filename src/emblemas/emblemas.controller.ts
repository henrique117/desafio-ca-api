import { Controller, Post, Body, Get, Query, UseGuards } from '@nestjs/common';
import { EmblemasDto, ParamsDto } from './emblemas.dto';
import { EmblemasService } from './emblemas.service';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('emblemas')
export class EmblemasController {

    constructor(private readonly emblemasService: EmblemasService) {}

    @Post()
    create(@Body() emblemas: EmblemasDto) {
        this.emblemasService.create(emblemas)
    }

    @Get()
    findAll(@Query() params: ParamsDto): EmblemasDto[] {
        return this.emblemasService.findAll(params)
    }
}
