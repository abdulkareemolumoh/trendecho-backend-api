import { Injectable } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class NewsService {
  create(createNewsDto: CreateNewsDto) {
    return prisma.news.create({
      data: createNewsDto,
    });
  }

  findAll() {
    return prisma.user.findMany();
  }

  findOne(id: number) {
    return prisma.news.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateNewsDto: UpdateNewsDto) {
    return `This action updates a #${id} news`;
  }

  remove(id: number) {
    return prisma.news.delete({
      where: {
        id,
      },
    });
  }
}
