import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateLikeDto } from './create-like.dto';

export class UpdateLikeDto extends PartialType(CreateLikeDto) {
  @ApiProperty({
    description: 'ID of the user who liked the comment',
  })
  authorId?: string;

  @ApiProperty({
    description: 'ID of the comment that was liked',
  })
  commentId?: number;

  @ApiProperty({
    description: 'ID of the news article that was liked',
  })
  newsId?: number;
}
