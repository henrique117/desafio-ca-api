import { Module } from '@nestjs/common';
import { EmblemasModule } from './emblemas/emblemas.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EmblemasModule,
    UsersModule,
    AuthModule,
    DbModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
