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

    const { passwordHash: _password, ...user } = await prisma.user.create({
      data: {
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        userName: createUserDto.userName,
        email: createUserDto.email,
        passwordHash: await hashPassword(createUserDto.passwordHash),
      },
    });

    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number) {
    const { passwordHash: _password, ...user } = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return user;
  }

  findOneByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return prisma.user.update({
      where: {
        id: id,
      },
      data: updateUserDto.image,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
