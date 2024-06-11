import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmblemasModule } from './emblemas/emblemas.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [EmblemasModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
