import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Patch,
    Post,
} from '@nestjs/common';
import {ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags} from '@nestjs/swagger';
import {EventTypesService} from './event-types.service';
import {AddEventTypeDto, EventTypeDto, PathEventTypeDto} from './dto';

@ApiTags('Event-types')
@Controller('event-types')
export class EventTypesController {
    constructor(private eventTypes: EventTypesService) {
    }

    @Get()
    @ApiOperation({ summary: 'Get all booking types' })
    @ApiOkResponse({
        type: [EventTypeDto],
    })
    getEventTypes(): Promise<EventTypeDto[]> {
        return this.eventTypes.getTypes();
    }

    @Post()
    @ApiOperation({ summary: 'Create new booking type' })
    @ApiCreatedResponse({
        type: EventTypeDto,
    })
    createEventType(@Body() body: AddEventTypeDto): Promise<EventTypeDto> {
        return this.eventTypes.createType(body);
    }

    @Patch('item/:id')
    @ApiOperation({ summary: 'Update booking type' })
    @ApiOkResponse({
        type: [EventTypeDto],
    })
    patchEventType(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() body: PathEventTypeDto,
    ) {
        return this.eventTypes.patchType(id, body);
    }

    @Delete(`item/:id`)
    @ApiOperation({ summary: 'Delete booking type' })
    @ApiOkResponse()
    @HttpCode(HttpStatus.OK)
    async removeEventType(@Param('id', new ParseIntPipe()) id: number) {
        return await this.eventTypes.removeType(id);
    }
}
