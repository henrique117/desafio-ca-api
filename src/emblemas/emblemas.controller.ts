import { Controller, Post, Get, UseGuards, Param, ParseIntPipe, Request, Body } from '@nestjs/common';
import { EmblemasService } from './emblemas.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserEmblemaEntity } from 'src/db/entities/user-emblemas.entity';
import { EmblemasDto } from './emblemas.dto';
import emblemasObject from './emblemasObject';
import { CustomRequest } from 'src/auth/custom.interface';

@Controller('emblemas')
export class EmblemasController {

    constructor(private readonly emblemasService: EmblemasService) {}

    @UseGuards(AuthGuard)
    @Post('place-emblemas')
    async create(@Body() placeEmblemas: EmblemasDto[]) {
        placeEmblemas = emblemasObject
        await this.emblemasService.create(placeEmblemas)
    }

    @UseGuards(AuthGuard)
    @Post('associate-emblema')
    async associate(@Request() req: CustomRequest) {
        await this.emblemasService.associate(req)
    }

    @UseGuards(AuthGuard)
    @Get('users/:userid')
    async findEmblemasByUserId(@Param('userid', ParseIntPipe) userId: number): Promise<UserEmblemaEntity[]> {
        return await this.emblemasService.findEmblemasByUserId(userId)
    }
}
