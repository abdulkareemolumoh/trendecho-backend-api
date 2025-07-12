import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class CommentService {
  create(createCommentDto: CreateCommentDto) {
    return prisma.comment.create({
      data: createCommentDto,
    });
  }

  findAll() {
    return prisma.comment.findMany({});
  }

  findOne(id: number) {
    return prisma.comment.findUnique({
      where: { id },
      include: { news: true, author: true },
    });
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return prisma.comment.update({
      where: { id },
      data: updateCommentDto,
    });
  }

  remove(id: number) {
    return prisma.comment.delete({
      where: { id },
    });
  }
}
