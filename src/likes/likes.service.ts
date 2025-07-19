import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class LikesService {
  async create(createLikeDto: CreateLikeDto) {
    const { authorId, commentId, newsId } = createLikeDto;

    // Validate that either commentId or newsId is provided — not both, not neither
    const isLikingComment = !!commentId;
    const isLikingNews = !!newsId;

    if (!isLikingComment && !isLikingNews) {
      throw new BadRequestException(
        'Either commentId or newsId must be provided',
      );
    }

    if (isLikingComment && isLikingNews) {
      throw new BadRequestException(
        'Cannot like both a comment and news at the same time',
      );
    }

    // Check for duplicate like
    const alreadyLiked = await prisma.likes.findUnique({
      where: isLikingComment
        ? { authorId_commentId: { authorId, commentId: commentId! } }
        : { authorId_newsId: { authorId, newsId: newsId! } },
    });

    if (alreadyLiked) {
      throw new ConflictException('You have already liked this item');
    }

    // Create the like
    return prisma.likes.create({ data: createLikeDto });
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
