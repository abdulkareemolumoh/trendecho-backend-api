import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/signInDto';
import { RolesGuard } from './roles.guard';
import { Roles } from './role.decorator';
import { Role } from './type';
import { AuthGuard } from './auth.guard';
import { Public } from './public.decorator';

@ApiTags('auth')
@Controller('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  createToken(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  // @UseGuards(RolesGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
