import { BadRequestException, Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import {AddEventTypeDto, PathEventTypeDto} from './dto';

@Injectable()
export class EventTypesService {
  constructor(private db: DbService) {}

  async getTypes() {
    return await this.db.eventType.findMany({});
  }

  async createType(data: AddEventTypeDto) {
    return await this.db.eventType.create({ data });
  }

  async patchType(eventId: number, patch: PathEventTypeDto) {
    const event = await this.db.eventType.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      throw new BadRequestException({ type: 'no event id' });
    }

    return this.db.eventType.update({
      where: { id: eventId },
      data: { ...event,...patch },
    });
  }

  async removeType(eventId: number) {
    const event = await this.db.eventType.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      throw new BadRequestException({ type: 'no event id' });
    }

    return this.db.eventType.delete({
      where: { id: eventId },
    });
  }
}
