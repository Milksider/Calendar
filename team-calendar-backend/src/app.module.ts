import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventTypesModule } from './event-types/event-types.module';
import { DbModule } from './db/db.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { BookingsController } from './bookings/bookings.controller';
import { BookingsModule } from './bookings/bookings.module';
import {BookingsService} from './bookings/bookings.service';

@Module({
  imports: [DbModule, EventTypesModule, UsersModule, BookingsModule],
  controllers: [AppController, BookingsController],
  providers: [AppService, UsersService, BookingsService],
})
export class AppModule {}
