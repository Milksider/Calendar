import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { DbModule } from '../db/db.module';
import { UsersService } from './users.service';

@Module({
  imports: [DbModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
