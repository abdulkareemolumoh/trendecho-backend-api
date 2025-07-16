import { Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class LikesService {
  create(createLikeDto: CreateLikeDto) {
    const { commentId, newsId } = createLikeDto;
    if (!commentId && !newsId) {
      throw new Error('Either commentId or newsId must be provided');
    }
    return prisma.likes.create({
      data: createLikeDto,
    });
  }

  findAll() {
    return prisma.likes.findMany();
  }

  findOne(id: number) {
    return prisma.likes.findUnique({
      where: { id },
    });
  }

  update(id: number, updateLikeDto: UpdateLikeDto) {
    return prisma.likes.update({
      where: { id },
      data: updateLikeDto,
    });
  }

  remove(id: number) {
    return prisma.likes.delete({
      where: { id },
    });
  }
}
