import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsInt,
  IsOptional,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

// Optional: Define a specific type for attributes to improve type safety
interface PostAttributes {
  featured?: boolean;
  tags?: string[];
  metadata?: Record<string, any>;
}

export class CreateNewsDto {
  @ApiProperty({
    description: 'The title of the news post',
    example: 'My First Blog Post',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The main content of the news post',
    example: 'This is the content of my first post.',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: 'The category of the news post',
    example: 'General',
  })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    description: 'A brief description of the news post',
    example: 'An introduction to my blog.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Whether the post is published (defaults to false)',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  published?: boolean;

  @ApiProperty({
    description: 'The ID of the user who authored the post',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  authorId: number;

  @ApiProperty({
    description: 'Additional attributes for the post in JSON format',
    example: { featured: true, tags: ['blog', 'intro'] },
    required: false,
  })
  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => Object)
  attributes?: PostAttributes;
}
