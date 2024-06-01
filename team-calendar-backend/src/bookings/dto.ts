import { ArrayNotEmpty, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../users/dto';
import {Optional} from '@nestjs/common';

export class BookingDTO {
  @ApiProperty({ default: '', example: 'Title' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ default: '', example: 'Description' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    default: new Date().toISOString(),
    example: '2022-10-31T08:00:00Z',
  })
  @IsNotEmpty()
  @IsString()
  startTime: Date;

  @ApiProperty({
    default: new Date().toISOString(),
    example: '2022-10-31T10:00:00Z',
  })
  @IsNotEmpty()
  @IsString()
  endTime: Date;

  @ApiProperty({ default: '', example: 'TypeA' })
  @IsNotEmpty()
  bookingType: string;

  @ApiProperty({ default: [], example: [] })
  @ArrayNotEmpty()
  users: UserDto[];
}

export class PatchBookingDTO {
  @ApiProperty({ default: '', example: 'Title' })
  @Optional()
  title?: string;

  @ApiProperty({ default: '', example: 'Description' })
  @Optional()
  description?: string;

  @ApiProperty({
    default: new Date().toISOString(),
    example: '2022-10-31T08:00:00Z',
  })
  @Optional()
  startTime?: Date;

  @ApiProperty({
    default: new Date().toISOString(),
    example: '2022-10-31T10:00:00Z',
  })
  @Optional()
  endTime?: Date;

  @ApiProperty({ default: '', example: 'TypeA' })
  @Optional()
  bookingType?: string;

  @ApiProperty({ default: [], example: [] })
  @ArrayNotEmpty()
  users: UserDto[];
}
