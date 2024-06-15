import { Module } from '@nestjs/common';
import { EmblemasController } from './emblemas.controller';
import { EmblemasService } from './emblemas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmblemasEntity } from 'src/db/entities/emblemas.entity';
import { UsersEntity } from 'src/db/entities/users.entity';
import { UserEmblemaEntity } from 'src/db/entities/user-emblemas.entity';

@Module({
    controllers: [EmblemasController],
    imports: [TypeOrmModule.forFeature([EmblemasEntity, UsersEntity, UserEmblemaEntity])],
    providers: [EmblemasService]
})
export class EmblemasModule {}
