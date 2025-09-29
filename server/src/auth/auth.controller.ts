import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto';
import {
  JwtAuthGuard,
  LocalAuthGuard,
  RolesGuard,
  LocalAdminAuthGuard,
} from './guards';
import { CurrentUser } from '../users/decorators';
import { Role, User } from '@prisma/client';
import { TransformDataInterceptor } from '../common/interceptors';
import { AuthResponse } from './types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseInterceptors(new TransformDataInterceptor(AuthResponse))
  async register(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.authService.register(createUserDto);
    return { success: true, data: newUser };
  }

  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new TransformDataInterceptor(AuthResponse))
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@CurrentUser() user: User) {
    const accessToken = await this.authService.createAccessToken(user.id);
    return {
      success: true,
      data: user,
      accessToken,
    };
  }

  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new TransformDataInterceptor(AuthResponse))
  @UseGuards(LocalAdminAuthGuard(Role.Admin))
  @Post('login-admin')
  loginAdmin(@CurrentUser() user: User) {
    return {
      success: true,
      data: user,
    };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new TransformDataInterceptor(AuthResponse))
  me(@CurrentUser() user: User) {
    return {
      success: true,
      data: user,
    };
  }

  @Get('me-admin')
  @UseGuards(RolesGuard(Role.Admin))
  @UseInterceptors(new TransformDataInterceptor(AuthResponse))
  meAdmin(@CurrentUser() user: User) {
    return {
      success: true,
      data: user,
    };
  }
}
