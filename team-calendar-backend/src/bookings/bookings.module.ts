import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { DbModule } from '../db/db.module';
import { BookingsController } from './bookings.controller';

@Module({
  imports: [DbModule],
  providers: [BookingsService],
  controllers: [BookingsController],
})
export class BookingsModule {}
