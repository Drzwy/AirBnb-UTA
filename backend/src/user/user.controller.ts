import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { Usuario } from '@prisma/client';
import { JwtGuard } from 'src/auth/guard';
import { User } from './decorator';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getMe(@User() user: Usuario) {
    return user;
  }

  @Get('get/:userId')
  getUserById(@Param('userId') userId: string) {
    return this.userService.getUserById(+userId);
  }

  @Delete('delete/:userId')
  deleteUserById(@Param('userId') userId: string) {
    return this.userService.deleteUserById(+userId);
  }

  @Patch('update/:userId')
  updateUserById(@Param('userId') userId: string, @Body() dto: UserUpdateDto) {}
}
