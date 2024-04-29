import { Controller, Get, UseGuards } from '@nestjs/common';
import { Usuario } from '@prisma/client';
import { JwtGuard } from 'src/auth/guard';
import { User } from './decorator';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  @Get('me')
  getMe(@User() user: Usuario) {
    return user;
  }
}
