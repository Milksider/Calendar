import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty, IsNumber, IsString} from 'class-validator';

import { Optional } from '@nestjs/common';

export class EventTypeDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  color: string;
}

export class AddEventTypeDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  color: string;
}

export class PathEventTypeDto {
  @ApiProperty({ required: false })
  @Optional()
  title?: string;

  @ApiProperty({ required: false })
  @Optional()
  color?: string;
}
