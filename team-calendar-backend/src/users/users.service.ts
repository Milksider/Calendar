import { BadRequestException, Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { AddUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(private db: DbService) {}

  async getUsers() {
    return this.db.user.findMany({});
  }

  async addUser(data: AddUserDto) {
    const user = await this.db.user.findFirst({ where: { email: data.email } });

    if (user) {
      throw new BadRequestException({ type: 'email exists' });
    }

    return this.db.user.create({ data });
  }

  async patchUser(userId: number, data: UpdateUserDto) {
    const user = await this.db.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new BadRequestException({ type: 'no user id' });
    }

    return this.db.user.update({
      where: { id: userId },
      data: { ...user,...data },
    });
  }

  async removeUser(userId: number) {
    const user = this.findUser(userId);

    if (!user) {
      throw new BadRequestException({ type: 'no user id' });
    }

    return this.db.user.delete({
      where: { id: userId },
    });
  }

  async findUser(userId: number) {
    return await this.db.user.findUnique({
      where: { id: userId },
    });
  }
}
