import * as dotenv from 'dotenv';
dotenv.config();
export const jwtConstants = {
  secret: process.env.JWT_SECRET,
};
export const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';
export const JWT_EXPIRES_IN = '1h';
export const JWT_REFRESH_EXPIRES_IN = '7d'; // 7 days

export const BCRYPT_SALT_ROUNDS = 10;

export const AUTH_COOKIE_NAME = 'auth_token';
