import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  // add other roles if needed
}

export class CreateUserDto {
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Unique email address of the user',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'JohnDoe', description: 'Username of the user' })
  @IsString()
  @IsNotEmpty()
  userName: string;

  @ApiProperty({
    enum: Role,
    default: Role.USER,
    description: 'Role of the user',
  })
  @IsEnum(Role)
  role?: Role = Role.USER;

  @ApiProperty({
    example: 'password123',
    description: 'Password of the user',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
