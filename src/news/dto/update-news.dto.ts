import { PartialType } from '@nestjs/mapped-types';
import { CreateNewsDto } from './create-news.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateNewsDto extends PartialType(CreateNewsDto) {
  @ApiProperty({
    description: 'The title of the news post',
    example: 'Nigeria Wins AFCON 2025',
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: 'The category of the news post',
    example: 'Sports',
    required: false,
  })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({
    description: 'A short description of the news',
    example: 'Nigeria clinches the trophy after a tough final.',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'The full content of the news article',
    example: 'In an electrifying final match...',
    required: false,
  })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty({
    description: 'The ID of the user who authored the news',
    example: 'c1d75d63-ae13-41a3-98db-3737e96eecde',
    required: false,
  })
  @IsString()
  @IsOptional()
  authorId?: string;

  @ApiProperty({
    description: 'Whether the news post is active',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({
    description: 'Whether the email is verified',
    example: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  emailVerified?: boolean;

  @ApiProperty({
    description: 'Whether the news is marked as deleted',
    example: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean;
}
