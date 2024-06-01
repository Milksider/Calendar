import {IsEmail, IsNotEmpty, IsNumber, IsString} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {Optional} from '@nestjs/common';

export class UserDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email of the user',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'johndoe',
    description: 'The username of the user',
  })
  @IsNotEmpty()
  @IsString()
  username: string;
}

export class AddUserDto {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  username: string;
}

export class UpdateUserDto {
  @ApiProperty({ required: false })
  @Optional()
  email?: string;

  @ApiProperty({ required: false })
  @Optional()
  username?: string;
}
