import {
  Injectable,
  UnauthorizedException,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JWT_EXPIRES_IN, jwtConstants } from './constants';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name); // Dedicated logger

  constructor(
    private usersService: UsersService, // Match order from AuthModule
    private jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    // Input validation
    if (!email || !password) {
      this.logger.warn('Missing email or password in signIn attempt');
      throw new BadRequestException('Email and password are required');
    }

    try {
      // Fetch user
      const user = await this.usersService.findOne(email);
      this.logger.debug(`Fetched user for email: ${email}`);

      if (!user) {
        this.logger.warn(`User not found for email: ${email}`);
        throw new UnauthorizedException('Invalid credentials');
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        this.logger.warn(`Invalid password for email: ${email}`);
        throw new UnauthorizedException('Invalid credentials');
      }

      // Create JWT payload
      const payload = {
        sub: user.id,
        email: user.email,
        roles: [user.role],
      };

      // Sign JWT
      const token = await this.jwtService.signAsync(payload, {
        secret: jwtConstants.secret,
        expiresIn: JWT_EXPIRES_IN,
      });

      this.logger.log(`Successful sign-in for email: ${email}`);
      return { access_token: token };
    } catch (error) {
      // Log unexpected errors
      this.logger.error(`Sign-in error for email: ${email}`, error.stack);

      // Re-throw known exceptions
      if (
        error instanceof UnauthorizedException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }

      // Handle unexpected errors
      throw new UnauthorizedException(
        'Authentication failed due to an internal error',
      );
    }
  }
}
