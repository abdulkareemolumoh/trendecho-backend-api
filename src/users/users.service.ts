import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient, Role } from '@prisma/client';
import { hashPassword } from '../utils/password.utils';

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  async createUser(createUserDto: CreateUserDto) {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }
    console.log('Creating user with data:', createUserDto.role);
    const { password: _password, ...user } = await prisma.user.create({
      data: {
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        userName: createUserDto.userName,
        email: createUserDto.email,
        password: await hashPassword(createUserDto.password),
        role: createUserDto.role,
      },
    });

    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string) {
    const { password: _password, ...user } = await prisma.user.findUnique({
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

  update(id: string, updateUserDto: UpdateUserDto) {
    return prisma.user.update({
      where: {
        id: id,
      },
      data: updateUserDto.image,
    });
  }

  remove(id: string) {
    return prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
