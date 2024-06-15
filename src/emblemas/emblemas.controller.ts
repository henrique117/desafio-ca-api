import { Controller, Post, Get, UseGuards, Param, ParseIntPipe, Request } from '@nestjs/common';
import { EmblemasService } from './emblemas.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserEmblemaEntity } from 'src/db/entities/user-emblemas.entity';

@Controller('emblemas')
export class EmblemasController {

    constructor(private readonly emblemasService: EmblemasService) {}

    @UseGuards(AuthGuard)
    @Post('novo')
    async create(@Request() req: any): Promise<UserEmblemaEntity> {
        return await this.emblemasService.create(req.user?.userid)
    }

    @UseGuards(AuthGuard)
    @Get('users/:userid')
    async findEmblemasByUserId(@Param('userid', ParseIntPipe) userId: number): Promise<UserEmblemaEntity[]> {
        return await this.emblemasService.findEmblemasByUserId(userId)
    }
}
