import { Module } from '@nestjs/common';
import { EventTypesController } from './event-types.controller';
import { EventTypesService } from './event-types.service';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  controllers: [EventTypesController],
  providers: [EventTypesService],
})
export class EventTypesModule {}
