import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'The content of the comment',
    example: 'This is a sample comment',
  })
  @IsString()
  content: string;

  @ApiProperty({
    description: 'The ID of the news article the comment is associated with',
    example: 1,
  })
  @IsNumber()
  newsId: number;

  @ApiProperty({
    description: 'The ID of the user who made the comment',
    example: 1,
  })
  @IsString()
  authorId: string;
}
