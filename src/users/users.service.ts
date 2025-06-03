import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../utils/password.utils';

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  async createUser(@Body() createUserDto: CreateUserDto) {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const { password: _password, ...user } = await prisma.user.create({
      data: {
        userName: createUserDto.userName,
        email: createUserDto.email,
        password: await hashPassword(createUserDto.password),
      },
    });

    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(email: string): any {
    return prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
