import {BadRequestException, Injectable} from '@nestjs/common';
import {BookingDTO, PatchBookingDTO} from './dto';
import {DbService} from '../db/db.service';

@Injectable()
export class BookingsService {
    constructor(private db: DbService) {
    }

    async deleteEmptyBookings() {
        const bookings = await this.db.booking.findMany({
            include: {
                users: true,
            },
        });

        for (const booking of bookings) {
            if (booking.users.length === 0) {
                await this.db.booking.delete({
                    where: {
                        id: booking.id,
                    },
                });
            }
        }
    }

    async getBookingsList(startDateTime: Date, endDateTime: Date) {
        await this.deleteEmptyBookings()
        let bookingList = await this.db.booking.findMany({
            where: {
                OR: [
                    {
                        OR: [
                            {
                                startTime: {
                                    gte: startDateTime,
                                    lte: endDateTime,
                                },
                            },
                            {
                                endTime: {
                                    gte: startDateTime,
                                    lte: endDateTime,
                                },
                            },
                        ],
                    },
                    {
                        AND: [
                            {
                                startTime: {
                                    lte: startDateTime,
                                },
                            },
                            {
                                endTime: {
                                    gte: endDateTime,
                                },
                            },
                        ],
                    },
                ],
            },
            include: {
                users: true, // Включение связанных пользователей
            },
        });

        return bookingList
    }

    async create(body: BookingDTO) {
        const {title, description, startTime, endTime, bookingType, users} = body;

        // Находим пользователей с id из массива users
        const existingUsers = await this.db.user.findMany({
            where: {id: {in: users.map((user) => Number(user))}},
        });

        // Находим полученый тип события в базе
        const existingBookingType = await this.db.eventType.findFirst({
            where: {title: bookingType},
        });

        // Проверяем, что все пользователи найдены
        if (existingUsers.length !== users.length) {
            throw new BadRequestException({type: 'user no exists'});
        }
        // Проверяем, что тип события существует
        if (!existingBookingType) {
            throw new BadRequestException({type: 'booking type no exists'});
        }

        const createdEvent = await this.db.booking.create({
            data: {
                title,
                description,
                startTime,
                endTime,
                bookingType,
                users: {
                    connect: users.map((userId) => ({id: Number(userId)})), // Свяжи записи пользователей с помощью идентификаторов
                },
            },
            include: {
                users: true, // Включение связанных записей пользователей
            },
        });

        return createdEvent;
    }

    async patch(bookingId: number, data: PatchBookingDTO) {
        const {title, description, startTime, endTime, bookingType, users} = data;

        // Находим пользователей с id из массива users
        const existingUsers = await this.db.user.findMany({
            where: {id: {in: users?.map((user) => Number(user))}},
        });

        // Находим полученый тип события в базе
        const existingBookingType = await this.db.eventType.findFirst({
            where: {title: bookingType},
        });

        // Список пользователей должен передаваться всегда
        if (!users) {
            throw new BadRequestException({type: 'user list cannot be empty'});
        }

        // Проверяем, что все пользователи найдены
        if (existingUsers.length !== users.length) {
            throw new BadRequestException({type: 'user no exists'});
        }

        // Проверяем, что тип события существует
        if (!existingBookingType && bookingType) {
            throw new BadRequestException({type: 'booking type no exists'});
        }

        const updatedBooking = await this.db.booking.update({
            where: {id: bookingId},
            data: {
                title,
                description,
                startTime,
                endTime,
                bookingType,
                users: {
                    set: users?.map((userId) => ({id: Number(userId)})),
                },
            },
            include: {
                users: true,
            },
        });

        return updatedBooking
    }

    async removeBooking(eventId: number) {
        const event = await this.db.booking.findUnique({
            where: {id: eventId},
        });

        if (!event) {
            throw new BadRequestException({type: 'no event id'});
        }

        return this.db.booking.delete({
            where: {id: eventId},
        });
    }
}
