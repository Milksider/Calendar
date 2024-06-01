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
import { UsersService } from './users.service';
import {ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags} from '@nestjs/swagger';
import { AddUserDto, UpdateUserDto, UserDto } from './dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse()
  getUsersList() {
    return this.usersService.getUsers();
  }

  @Post()
  @ApiOperation({ summary: 'Create new user' })
  @ApiCreatedResponse()
  createUser(@Body() body: AddUserDto) {
    return this.usersService.addUser(body);
  }

  @Patch('item/:id')
  @ApiOperation({ summary: 'Update user' })
  @ApiOkResponse({
    type: UserDto,
  })
  updateUser(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: UpdateUserDto,
  ) {
    return this.usersService.patchUser(id, body);
  }

  @Delete('item/:id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async removeUser(@Param('id', new ParseIntPipe()) id: number) {
    return this.usersService.removeUser(id);
  }
}
