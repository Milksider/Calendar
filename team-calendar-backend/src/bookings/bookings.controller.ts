import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe, Patch,
    Post, Query,
} from '@nestjs/common';
import {
    ApiCreatedResponse,
    ApiOkResponse, ApiOperation,
    ApiQuery,
    ApiResponse,
    ApiTags
} from '@nestjs/swagger';
import {BookingDTO, PatchBookingDTO} from './dto';
import {BookingsService} from './bookings.service';

@ApiTags('Bookings')
@Controller('bookings')
export class BookingsController {
    constructor(private bookingService: BookingsService) {
    }

    @Get()
    @ApiOperation({ summary: 'Get bookings in specified time range' })
    @ApiQuery({ name: 'startDateTime', type: 'string', example: '2022-01-01T00:00:00' })
    @ApiQuery({ name: 'endDateTime', type: 'string', example: '2022-01-31T23:59:59' })
    @ApiOkResponse({
        type: [BookingDTO],
    })
    getBookings(
        @Query('startDateTime') startDateTime: string,
        @Query('endDateTime') endDateTime: string,
    ) {
        const startDate = new Date(startDateTime);
        const endDate = new Date(endDateTime);
        return this.bookingService.getBookingsList(startDate, endDate);
    }

    @Post()
    @ApiOperation({ summary: 'Create new booking' })
    @ApiCreatedResponse({
        type: BookingDTO,
    })
    createBooking(@Body() body: BookingDTO) {
        return this.bookingService.create(body);
    }

    @Patch('item/:id')
    @ApiOperation({ summary: 'Update booking' })
    @ApiOkResponse({
        type: BookingDTO
    })
    patchBooking(@Param('id', new ParseIntPipe()) id: number,
                 @Body() body: PatchBookingDTO,) {
        return this.bookingService.patch(id, body)
    }

    @Delete('item/:id')
    @ApiOperation({ summary: 'Delete booking' })
    @ApiOkResponse()
    @HttpCode(HttpStatus.OK)
    async removeBooking(@Param('id', new ParseIntPipe()) id: number) {
        return await this.bookingService.removeBooking(id);
    }
}
