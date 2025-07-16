import { ApiProperty } from '@nestjs/swagger';

export class CreateLikeDto {
  @ApiProperty({
    description: 'ID of the user who liked the comment',
  })
  authorId: string;

  @ApiProperty({
    description: 'ID of the comment that was liked',
  })
  commentId: number;

  @ApiProperty({
    description: 'ID of the news article that was liked',
  })
  newsId: number;
}
