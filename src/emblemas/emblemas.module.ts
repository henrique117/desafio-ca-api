import { Module } from '@nestjs/common';
import { EmblemasController } from './emblemas.controller';
import { EmblemasService } from './emblemas.service';

@Module({
    controllers: [EmblemasController],
    providers: [EmblemasService]
})
export class EmblemasModule {}
