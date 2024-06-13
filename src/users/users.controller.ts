import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDto } from './users.dto';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Post()
    async create(@Body() newUser: UsersDto) {
        return await this.usersService.create(newUser)
    }
}
