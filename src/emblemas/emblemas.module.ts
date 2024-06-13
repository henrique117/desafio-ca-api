import { Module } from '@nestjs/common';
import { EmblemasController } from './emblemas.controller';
import { EmblemasService } from './emblemas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'src/db/entities/users.entity';

@Module({
    controllers: [EmblemasController],
    imports: [TypeOrmModule.forFeature([UsersEntity])],
    providers: [EmblemasService]
})
export class EmblemasModule {}
