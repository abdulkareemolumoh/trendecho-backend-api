import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: "URL of the user's profile image",
  })
  image?: string;
}
