import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDto } from './users.dto';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(@Body() newUser: UsersDto) {
        this.usersService.create(newUser)
    }
}
