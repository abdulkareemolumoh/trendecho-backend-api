import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SignInDto } from './dto/signInDto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @ApiOperation({
    summary: 'Generate authentication token',
    description:
      'Creates and returns an authentication token based on the provided credentials.',
  })
  @ApiBody({
    // type: TokenRequestBody,
    description: 'User credentials',
    examples: {
      validCredentials: {
        summary: 'Valid credentials',
        value: { username: 'user@example.com', password: 'password123' },
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiBadRequestResponse({ description: 'Invalid request body' })
  async createToken(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
